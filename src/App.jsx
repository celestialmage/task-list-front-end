import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kBaseUrl = 'http://127.0.0.1:5000';

const convertFromApi = ({ id, title, description, is_complete } ) => {
  return { id, title, description, isComplete: is_complete };
};

const toggleTaskApi = (id, completed) => {
  const path = completed ? 'mark_incomplete' : 'mark_complete';
  return axios.patch(`${kBaseUrl}/tasks/${id}/${path}`)
    .then(response => response.data.task)
    .then(task => convertFromApi(task))
    .catch(error => console.log(error));
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (id, isComplete) => {
    return toggleTaskApi(id, isComplete)
      .then(taskResult => {
        //console.log(taskResult);
        setTasks(tasks => {
          return tasks.map(task => {
            // If the task id matches the one we toggled, return the updated task
            // Otherwise, return the task unchanged
            return task.id === id ? taskResult : task;
          });
        });
      });
  };

  const deleteTaskApi = (id) => {
    return axios.delete(`${kBaseUrl}/tasks/${id}`)
      .catch(error => console.log(error));
  };

  const removeTask = (id) => {
    return deleteTaskApi(id)
      .then(
        setTasks(tasks => tasks.filter(task => task.id !== id))
      );
  };

  const getTasks = () => {
    return axios.get(`${kBaseUrl}/tasks`)
      .then(response => response.data.map(task => {
        return convertFromApi(task);
      }))
      .then(setTasks)
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            toggleTask={toggleTask}
            removeTask={removeTask}
          />
        </div>
        <NewTaskForm />
      </main>
    </div>
  );
};

export default App;
