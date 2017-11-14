import * as React from "react";
import * as ReactDOM from "react-dom";
import {Counter} from "./components/Counter";

ReactDOM.render(
  <App />
  , document.getElementById("root")
);

function App(props) {
  return (
    <Counter />
  );
}