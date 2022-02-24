import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import {
  Form,
  FormInput,
  FormParagraph,
  FormTextArea,
  Priorities,
  Priority,
} from '../styles/StyledForm';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadingSpinner } from '../styles/StyledForm';

const TaskForm = React.forwardRef(
  (
    {
      addTaskForm,
      editTaskForm,
      formErrors,
      formWarnings,
      handleErrorInformation,
      handleUserInput,
      handleSubmitForm,
      loadingAddTask,
      loadingEditTask,
      taskBodyValue,
      taskFinishDateValue,
      taskPriorityValue,
      setFormType,
    },
    ref
  ) => {
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    useEffect(() => {
      if (addTaskForm) {
        setFormType('addTaskForm');
      } else if (editTaskForm) {
        setFormType('editTaskForm');
      }
    }, [addTaskForm, editTaskForm, setFormType]);

    const generatePriorityStars = () => {
      let stars = [];
      const priorityStars = [];

      for (let i = 1; i < 4; i++) {
        stars = [...stars, <FontAwesomeIcon key={i} icon={faStar} />];

        priorityStars.push(
          <Priority key={i} amount={i}>
            <input
              checked={i === parseInt(taskPriorityValue, 10)}
              disabled={isLogoutTimeoutModalOpen}
              id={i}
              name='taskPriority'
              type='radio'
              value={taskPriorityValue}
              onChange={(e) => handleUserInput(e)}
            />
            <label htmlFor={i}>{stars}</label>
          </Priority>
        );
      }
      return priorityStars;
    };

    const handleMinDateInput = () => {
      const date = new Date().toISOString().split('.')[0];
      return date.substring(0, date.length - 3);
    };

    handleMinDateInput();

    return (
      <Form onSubmit={handleSubmitForm}>
        {handleErrorInformation()}
        {formErrors.taskBody && <FormParagraph error={true}>{formErrors.taskBody}</FormParagraph>}
        <FormTextArea
          disabled={isLogoutTimeoutModalOpen}
          name='taskBody'
          maxLength={100}
          type='text'
          placeholder='Zadanie'
          required
          value={taskBodyValue}
          ref={ref}
          onChange={(e) => handleUserInput(e)}
        />
        {formWarnings.taskBody && (
          <FormParagraph warning={true}>{formWarnings.taskBody}</FormParagraph>
        )}

        {formErrors.taskFinishDate && (
          <FormParagraph error={true}>{formErrors.taskFinishDate}</FormParagraph>
        )}
        <FormParagraph>Planowana data zakończenia</FormParagraph>
        <FormInput
          disabled={isLogoutTimeoutModalOpen}
          id='date'
          min={handleMinDateInput()}
          name='taskFinishDate'
          type='datetime-local'
          value={taskFinishDateValue}
          onChange={(e) => handleUserInput(e)}
        />
        <Priorities>
          {formErrors.taskPriority && (
            <FormParagraph error={true}>{formErrors.taskPriority}</FormParagraph>
          )}
          <p>Priorytet zadania</p>
          <ul>
            {editTaskForm && (
              <Priority>
                <input
                  disabled={isLogoutTimeoutModalOpen}
                  id={0}
                  name='taskPriority'
                  type='radio'
                  value={taskPriorityValue}
                  onChange={(e) => handleUserInput(e)}
                />
                <label htmlFor={0}>Brak</label>
              </Priority>
            )}

            {generatePriorityStars()}
          </ul>
        </Priorities>
        <button disabled={isLogoutTimeoutModalOpen || loadingAddTask} type='submit'>
          {addTaskForm ? 'Dodaj' : 'Edytuj'} zadanie
          {(loadingAddTask || loadingEditTask) && <LoadingSpinner />}
        </button>
      </Form>
    );
  }
);

export default TaskForm;
