import * as React from "react";
import {enhanceWith} from "../../../../src";

export function CounterStateless(props) {
  return (
    <div>
      Count: {props.count}
      <button onClick={props.onIncrementClick}>+1</button>
      <button onClick={props.onDecrementClick}>-1</button>
    </div>
  );
}

const enhance = enhanceWith(
  function getDefaultState(props) {
    return { count: (props.initialCount || 0) };
  },
  function mapStaticMethods({ setState, state }) {
    return {
      onIncrementClick() { setState({ count: state.count + 1 }); },
      onDecrementClick() { setState({ count: state.count - 1 }); },
    };
  }
);

export const Counter = enhance(CounterStateless);