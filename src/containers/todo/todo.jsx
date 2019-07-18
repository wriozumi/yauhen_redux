import React, { Component } from "react";
import { connect } from "react-redux";

import { addTask, removeTask, completeTask, changeFilter } from "../../actions/actionCreator";

import ToDoInput from "../../components/todo-input/todo-input.jsx";
import ToDoList from "../../components/todo-list/todo-list.jsx";
import Footer from "../../components/footer/footer.jsx";

import "./todo.css";

class ToDo extends Component {
  state = {
    taskText: ""
  };

  handleInputChange = ({ target: { value } }) =>
    this.setState({
      taskText: value
    });

  addTask = ({ key }) => {
    const { taskText } = this.state;
    if (taskText.length > 3 && key === "Enter") {
      const { addTask } = this.props;

      addTask(new Date().getTime(), taskText, false);
      this.setState({
        taskText: ""
      });
    }
  };

  filterTasks = (tasks, activeFilter) => {
    switch (activeFilter) {
      case 'completed':
        return tasks.filter(task => task.isCompleted);
        break;
      case 'active':
        return tasks.filter(task => !task.isCompleted);
        break;
      default:
        return tasks;
    }
  }

  render() {
    const { activeFilter, taskText } = this.state;
    const { tasks, removeTask, completeTask, filters, changeFilter } = this.props;
    const isTasksExist = tasks && tasks.length > 0;
    const filteredTasks = this.filterTasks(tasks, filters)
    return (
      <div className="todo-wrapper">
        <ToDoInput
          onKeyPress={this.addTask}
          onChange={this.handleInputChange}
          value={taskText}
        />
        {isTasksExist && <ToDoList completeTask={completeTask} removeTask={removeTask} tasksList={filteredTasks} />}
        {isTasksExist && (
          <Footer changeFilter={changeFilter} amount={tasks.length} activeFilter={filters} />
        )}
      </div>
    );
  }
}

export default connect(({ tasks, filters }) => ({
  tasks,
  filters
}),
  { addTask, removeTask, completeTask, changeFilter })(ToDo);
