import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ onPostTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleChange = (event) => {
    if (event.target.id === 'task-title') {
      setTitle(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newTaskData = {
      title,
      description,
    };
    onPostTask(newTaskData);
    setTitle('');
    setDescription('');
  };
  return (
    <section className="new-task-section">
      <h2>Add a new task</h2>
      <form className="new-task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="task-title">Task title:</label>
          <input
            className="form-input"
            id="task-title"
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="task-description">Task description:</label>
          <input
            className="form-input"
            id="task-description"
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <button className="form-button" type="submit">Add a new Task</button>
      </form>
    </section>
  );
};

NewTaskForm.propTypes = {
  onPostTask: PropTypes.func.isRequired,
};
export default NewTaskForm;
