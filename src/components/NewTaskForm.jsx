import { useState } from 'react';

const NewTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleChange = (event) => {
    if (event.target.id === 'task-title') {
      setTitle(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };
  return (
    <section>
      <h2> Add a new task</h2>
      <form>
        <div>
          <label htmlFor="task-title">Task title:</label>
          <input id="task-title" type="text" name="title" value={title} onChange={handleChange}></input>
        </div>
        <div>
          <label htmlFor="input-task">Task description:</label>
          <input
            id="task-description"
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          ></input>
        </div>
      </form>
    </section>
  );
};

export default NewTaskForm;
