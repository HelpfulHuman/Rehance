# React Enhance

This is a utility library for React to be able to build more robust functionality on top of stateless (aka, pure function) components.  This library is inspired by [recompose](https://npmjs.com/package/recompose), but aims to create a _single_ higher-order component instead of multiple.

## Getting Started

Install via `npm`:

```
npm i -S @helpfulhuman/react-enhance
```

## Usage

### Counter Example

```tsx
import * as React from "react";
import {enhance, addStateValue, addMethod} from "@helpfulhuman/react-enhance";

const Counter = enhance(
  addStateValue("count", "setCount", 0),
  addMethod("increment", ({ setCount, state }) => setCount(state.count + 1)),
  addMethod("decrement", ({ setCount, state }) => setCount(state.count - 1))
)(function (props) {
  return (
    <div>
      {props.count}
      <button onClick={props.increment}>+1</button>
      <button onClick={props.increment}>-1</button>
    </div>
  );
});
```

### Form Example (using `ref`)

```tsx
import * as React from "react";
import {enhance, addInput, addMethod} from "@helpfulhuman/react-enhance";

const LoginForm = enhance(
  addInput("email"),
  addInput("password"),
  addMethod("onSubmit", ({ getInputValues }) => {
    console.log(getInputValues());
  })
)(function (props) {
  return (
    <div>
      <input type="email" ref={props.bindInput.email} />
      <input type="password" ref={props.bindInput.password} />
      <button onClick={props.onSubmit}>Login</button>
    </div>
  );
});
```