# Rehance

Rehance is a state-management utility for React components and allows you to add state to stateless (aka, pure function) components.

## Getting Started

Install via `npm`:

```bash
npm i -S rehance
```

## Usage

This library exposes several functions that you can compose to create [higher-order components](https://reactjs.org/docs/higher-order-components.html) that encapsulate and handle multiple types of values and their state.  The most important of these functions is `enhanceWith()`.

```tsx
import * as React from "react";
import {enhanceWith} from "rehance";
import Example from "./components/Example";

const withValues = enhanceWith({
  //
}, {

});

const ExampleWithValues = withValues(Example);
```

### Counter Example

Let's look at the simple type of state, which is made possible via the `simple()` function.  This method can track a value and will update the

```tsx
import * as React from "react";
import {enhanceWith, simple} from "rehance";

const Counter = enhanceWith({
  count: simple(0),
}, {
  increment({ count }) {
    count.set(count.value + 1);
  },
  decrement({ count }) {
    count.set(count.value - 1);
  },
})(function (props) {
  return (
    <div>
      Count: {props.count.value}
      <button onClick={props.increment}>+1</button>
      <button onClick={props.decrement}>-1</button>
    </div>
  );
});
```

### Stateful Form Example

```tsx
import * as React from "react";
import {enhanceWith, asInput, isEmail, isLength} from "rehance";

const LoginForm = enhanceWith({
  emailInput: asInput({ type: "email", validate: isEmail() }),
  passwordInput: asInput({ type: "password", validate: isLength(8, 24) }),
}, {
  isValid({ emailInput, passwordInput }) {
    return (
      emailInput.isValid && passwordInput.isValid
    );
  },
  onSubmit({ emailInput, passwordInput }, ownProps) {
    console.log("Email: " + emailInput.value);
    console.log("Password: " + passwordInput.value);
  },
})(function (props) {
  return (
    <div>
      <input {...props.emailInput} />
      <input {...props.passwordInput} />
      <button
        disabled={!props.isValid()}
        onClick={props.onSubmit}>
        Login
      </button>
    </div>
  );
});
```

### `ref` Based Form Example

```tsx
import * as React from "react";
import {enhanceWith, byRef} from "rehance";

const LoginForm = enhanceWith({
  emailInput: byRef(),
  passwordInput: byRef(),
}, {
  onSubmit({ emailInput, passwordInput }, ownProps) {
    console.log("Email: " + emailInput.value);
    console.log("Password: " + passwordInput.value);
  },
})(function (props) {
  return (
    <div>
      <input type="email" ref={props.emailInput.ref} />
      <input type="password" ref={props.passwordInput.ref} />
      <button onClick={props.onSubmit}>Login</button>
    </div>
  );
});
```