import * as React from "react";
import {enhanceWith} from "../../../../src";

export interface Props {
  count: number;
  onIncrementClick(): void;
  onDecrementClick(): void;
}

export function CounterStateless<Props>(props) {
  return (
    <div>
      Count: {props.count}
      <button onClick={props.onIncrementClick}>+1</button>
      <button onClick={props.onDecrementClick}>-1</button>
    </div>
  );
}

export interface EnhancedProps {
  initialCount?: number;
}

const enhance = enhanceWith<EnhancedProps>(
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