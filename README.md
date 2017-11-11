# React Enhance

This is a utility library for React to be able to build more robust functionality on top of stateless (aka, pure function) components.  This library is inspired by [recompose](https://npmjs.com/package/recompose) and [react-redux's `connect()` method](https://npmjs.com/package/react-redux), but aims to create a _single_ higher-order component instead of multiple.

## Getting Started

Install via `npm`:

```
npm i -S @helpfulhuman/react-enhance
```

## Usage

### Counter Example

```tsx
import * as React from "react";
import {enhanceWith} from "@helpfulhuman/react-enhance";

const Counter = enhanceWith(
  function getDefaultState(props) {
    return { count: 0 };
  },
  function mapStaticMethods({ state, setState }) {
    return {
      increment() { setState({ count: state.count + 1 }); },
      decrement() { setState({ count: state.count - 1 }); },
    };
  }
)(function (props) {
  return (
    <div>
      Count: {props.count}
      <button onClick={props.increment}>+1</button>
      <button onClick={props.decrement}>-1</button>
    </div>
  );
});
```

### Stateful Form Example

```tsx
import * as React from "react";
import {enhanceWith, bindInputChange} from "@helpfulhuman/react-enhance";

const LoginForm = enhanceWith(
  function getDefaultState(props) {
    return {
      email: "",
      password: "",
    };
  },
  function mapStaticMethods(hoc) {
    return {
      onEmailChange: bindInputChange(hoc, "email"),
      onPasswordChange: bindInputChange(hoc, "password"),
      onSubmit() { console.log(hoc.state); },
    };
  }
)(function (props) {
  return (
    <div>
      <input type="email" onChange={props.onEmailChange} value={props.email} />
      <input type="password" onChange={props.onPasswordChange} value={props.password} />
      <button onClick={props.onSubmit}>Login</button>
    </div>
  );
});
```