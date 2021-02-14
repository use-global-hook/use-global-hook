# use-global-hook 中文

[EN](https://github.com/andregardi/use-global-hook)

简易的状态管理，使用小于1KB的Hook进行响应。

----

目录

- [安装](#安装)

- [最简示例](#最简示例)

- [完整示例](#完整示例)

- [使用TypeScript](#使用TypeScript)

## <a name="安装">安装</a>

```javascript
yarn add use-global-hook

```

## <a name="最简示例">最简示例</a>


```javascript
import React from 'react';
import globalHook from 'use-global-hook';

const initialState = {
  counter: 0,
};

const actions = {
  addToCounter: (store, amount) => {
    const newCounterValue = store.state.counter + amount;
    store.setState({ counter: newCounterValue });
  },
};

const useGlobal = globalHook(React, initialState, actions);

const App = () => {
  const [globalState, globalActions] = useGlobal();
  return (
    <div>
      <p>
        counter:
        {globalState.counter}
      </p>
      <button type="button" onClick={() => globalActions.addToCounter(1)}>
        +1 to global
      </button>
    </div>
  );
};

export default App;

```

## <a name="完整示例">完整示例</a>

<a href="https://codesandbox.io/s/duogejishuqigongxiangyigezhi-yyx4p" target="_blank">多个计数器，共享一个值</a>

添加任意数量的计数器，它们共享相同的全局值。<br/>
每次一个计数器向全局值加1时，所有计数器都会渲染，而父组件不会重新渲染。

----

<a href="https://codesandbox.io/s/yibuajaxqingqiu-4s5ey" target="_blank">异步ajax请求</a>

通过用户名搜索GitHub存储库。 使用 async/await 异步处理ajax请求。 每次搜索时更新请求计数器。

----

<a href="https://codesandbox.io/s/bimianbubiyaodexuanran-1v2qi" target="_blank">避免不必要的渲染</a>

在使用之前，先映射全局状态的子集。 仅当子集更新时，组件才会重新渲染。

----

<a href="https://codesandbox.io/s/classzujianzhongshiyong-m79rk" target="_blank">Class组件中使用</a>

Hook不能在Class组件内部使用。 可以创建一个将任何Class组件与State连接起来的高阶组件。<br/> 
使用connect()函数，State和actions成为组件的props。

----

<a href="https://codesandbox.io/s/tongguoimmerjsjichengshixianbukebianzhuangtai-wv3yi" target="blank">通过Immer.js集成实现不可变状态</a>

在Hook中添加Immer.js库，以管理复杂的不可变状态。<br/> 
在setState函数中对状态（state）草稿（draft）进行突变。 Immer将计算状态差异并创建一个新的不可变状态对象。

----

## <a name="使用TypeScript">使用TypeScript</a>

安装TypeScript声明的文件包

```javascript
npm install @types/use-global-hook

```

使用示例


```javascript
import globalHook, { Store } from 'use-global-hook';

// 需要定义自己的状态（state）和相关动作（actions）
type MyState = {
  value: string;
};

// 关联的动作（actions）是期望从globalHook获取返回的内容
type MyAssociatedActions = {
  setValue: (value: string) => void;
  otherAction: (other: boolean) => void;
};

// setValue将由globalHook返回为setValue.bind（null，store）
// 这是必须声明单独的关联动作类型的原因之一
const setValue = (
  store: Store<MyState, MyAssociatedActions>,
  value: string
) => {
  store.setState({ ...store.state, value });
  store.actions.otherAction(true);
};

const otherAction = (
  store: Store<MyState, MyAssociatedActions>,
  other: boolean
) => { /* 这里写你的代码 */ };

const initialState: MyState = {
  value: "myString"
};

// 传递给globalHook的操作
const actions = {
  setValue,
  otherAction
};

const useGlobal = globalHook<MyState, MyAssociatedActions>(
  React,
  initialState,
  actions
);

// 用法
const [state, actions] = useGlobal<MyState, MyAssociatedActions>();

// 子集
const [value, setValue] = useGlobal<string, (value: string) => void>(
  (state: MyState) => state.value,
  (actions: MyAssociatedActions) => actions.setValue
);

// 不声明类型，useGlobal将返回unknown
const [state, actions] = useGlobal(); // returns [unknown, unknown]

// 尽情享用 TypeScript!

```