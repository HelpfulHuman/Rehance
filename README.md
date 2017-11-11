# Rehance

This is a utility library for React to be able to build more robust functionality on top of stateless (aka, pure function) components.  This library is inspired by [recompose](https://npmjs.com/package/recompose) and [react-redux's `connect()` method](https://npmjs.com/package/react-redux), but aims to create a _single_ higher-order component instead of multiple.

## Getting Started

Install via `npm`:

```bash
npm i -S rehance
```

## Usage

### Counter Example

```tsx
import * as React from "react";
import {enhanceWith} from "rehance";

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

### Fetch Data on Load

```tsx
import * as React from "react";
import {enhanceWith} from "rehance";

const NewsFeed = enhanceWith(
  function getDefaultState(props) {
    return {
      loading: true,
      data: null,
    };
  },
  null,
  function mapLifecycleHooks({ props, setState }) {
    return {willMount() {
      fetch(props.url).then(function (res) {
        setState({ loading: false, data: res.json() });
      });
    }};
  }
)(function (props) {
  if (props.loading) {
    return (
      <div>Loading</div>
    );
  }

  return (
    <div>
      {props.data.map(item => <div>{item}</div>)}
    </div>
  );
});
```

### Stateful Form Example

```tsx
import * as React from "react";
import {enhanceWith, bindInputChange} from "rehance";

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

### `ref` Based Form Example

```tsx
import * as React from "react";
import {enhanceWith, bindInputRef, getInputValues} from "rehance";

const LoginForm = enhanceWith(
  null,
  function mapStaticMethods(hoc) {
    return {
      bindEmailInput: bindInputRef(hoc, "email"),
      bindPasswordInput: bindInputRef(hoc, "password"),
      onSubmit() { console.log(getInputValues(hoc)); },
    };
  }
)(function (props) {
  return (
    <div>
      <input type="email" ref={this.bindEmailInput} />
      <input type="password" ref={this.bindPasswordInput} />
      <button onClick={props.onSubmit}>Login</button>
    </div>
  );
});
```