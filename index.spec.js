import React, { useEffect } from 'react';
import Promise from 'bluebird';
import { renderHook, act } from '@testing-library/react-hooks';

import useGlobalHook from '.';
import { subsetActions, defaultActions } from './test';

describe('useGlobalHook', () => {
  describe('default actions', () => {
    describe('setState', () => {
      it('works - single listener', () => {
        const useTest = useGlobalHook(React, { a: undefined }, defaultActions);
        const { result } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
      });

      it('initializer', () => {
        const initializer = store => {
          store.setState({ a: 'a' });
        };
        const useTest = useGlobalHook(
          React,
          { a: undefined },
          defaultActions,
          initializer
        );
        const { result } = renderHook(() => useTest());

        expect(result.current[0].a).toEqual('a');
      });

      it('works - multi listener', () => {
        const useTest = useGlobalHook(React, { a: undefined }, defaultActions);
        const { result } = renderHook(() => useTest());
        const { result: result2 } = renderHook(() => useTest());

        act(() => {
          result.current[1].setState({ a: 'a' });
        });

        expect(result.current[0].a).toEqual('a');
        expect(result2.current[0].a).toEqual('a');
      });

      it('works - multi destroy chase -- continue', () => {
        const useTest = useGlobalHook(React, { a: undefined }, defaultActions);
        const { unmount } = renderHook(() => useTest());
        const promiseFns = [];
        for (let i; i < 20; i++) {
          promiseFns.push(() =>
            Promise.resolve(
              renderHook(() => {
                const hook = useTest();
                if (i === 10) {
                  // TODO: somehow produce the race condition
                  // TODO which will hit continue in setState
                  // attempt to call setState while listeners are being added
                  hook[1].setState({ a: 'b' });
                }
                return hook;
              })
            )
          );
        }

        const race = Promise.map(promiseFns, fn => fn());

        const promise = Promise.join(
          race,
          // @ts-ignore
          Promise.delay(10).then(() => {
            unmount();
          })
        );

        const { result: result2 } = renderHook(() => useTest());

        act(() => {
          result2.current[1].setState({ a: 'a' });
        });
        return promise.then(() => {
          expect(result2.current[0].a).toEqual('a');
        });
      });
    });

    it('does not complain defined actions', () => {
      useGlobalHook(React, undefined, defaultActions);
    });

    it('fails with no actions', () => {
      expect(() => useGlobalHook(React)).toThrow();
    });
  });
  describe('custom actions', () => {
    it('works - single listener', () => {
      const useTest = useGlobalHook(
        React,
        { a: undefined, subset: { b: 'hi' } },
        subsetActions
      );
      const { result } = renderHook(() => useTest());

      act(() => {
        result.current[1].setA('a');
        result.current[1].subset.setB('b');
      });

      expect(result.current[0].a).toEqual('a');
      expect(result.current[0].subset.b).toEqual('b');
    });
  });
});
