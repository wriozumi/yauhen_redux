import React, { Fragment } from "react";
import Todo from "./containers/todo/todo.jsx";
import Title from "./components/title/title.jsx";

const App = () => (
  <Fragment>
    <Title title="Todo App" />
    <Todo />
  </Fragment>
);

export default App;
