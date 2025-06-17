import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kBaseUrl = 'http://127.0.0.1:5000';

// const TASKS = [
//   {
//     id: 1,
//     title: 'Mow the lawn',
//     isComplete: false,
//   },
//   {
//     id: 2,
//     title: 'Cook Pasta',
//     isComplete: true,
//   },
// ];

const convertFromApi = ({ id, title, description, is_complete }) => {
  return { id, title, description, isComplete: is_complete };
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const toggleTask = (id) => {
    setTasks(tasks => {
      return tasks.map(task => {
        if (task.id === id) {
          return {...task, isComplete: !task.isComplete};
        }else {
          return task;
        }
      });
    });
  };

  const removeTask = (id) => {
    setTasks(tasks => {
      return tasks.filter(task => {
        return task.id !== id;
      });
    });
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
        <div>{<TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          removeTask={removeTask}
        />}</div>
      </main>
    </div>
  );
};

export default App;
