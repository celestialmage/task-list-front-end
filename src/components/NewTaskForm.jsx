import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const kDefaultFormData = {
  title: '',
  description: '',
};

const NewTaskForm = ({ onPostTask }) => {
  const [formData, setFormData] = useState(kDefaultFormData);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const handleChange = (event) => {
    // if (event.target.id === 'task-title') {
    //   setTitle(event.target.value);
    // } else {
    //   setDescription(event.target.value);
    // }
    setFormData(formData => {
      return {...formData, [event.target.name]: event.target.value };});
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onPostTask(formData);
    setFormData(kDefaultFormData);
  };
  const generateInput = (inputName) => {
    return (
      <div>
        <label htmlFor={`task-${inputName}`}>Task {inputName}:</label>
        <input
          id={`task-${inputName}`}
          type="text"
          name={inputName}
          value={formData[inputName]}
          onChange={handleChange}
        />
      </div>
    );
  };
  return (
    <section className="new-task-section">
      <h2>Add a new task</h2>
      <form className="new-task-form" onSubmit={handleSubmit}>
        {generateInput('title')}
        {generateInput('description')}
        <button className="form-button" type="submit">Click to add</button>
      </form>
    </section>
  );
};

NewTaskForm.propTypes = {
  onPostTask: PropTypes.func.isRequired,
};
export default NewTaskForm;
