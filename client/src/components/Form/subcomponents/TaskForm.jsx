import React, { useEffect } from 'react';

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

const TaskForm = React.forwardRef(
  (
    {
      formErrors,
      formWarnings,
      handleErrorInformation,
      handleUserInput,
      handleSubmitForm,
      taskDateValue,
      taskNameValue,
      taskPriorityValue,
      setFormKind,
    },
    ref
  ) => {
    useEffect(() => {
      setFormKind('addTaskForm');
    }, [setFormKind]);

    const generatePriorityStars = () => {
      let stars = [];
      const priorityStars = [];

      for (let i = 1; i < 4; i++) {
        stars = [...stars, <FontAwesomeIcon key={i} icon={faStar}></FontAwesomeIcon>];

        priorityStars.push(
          <Priority key={i} amount={i}>
            <input
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

    return (
      <Form onSubmit={handleSubmitForm}>
        {handleErrorInformation()}
        {formErrors.taskName && <FormParagraph error={true}>{formErrors.taskName}</FormParagraph>}
        <FormTextArea
          name='taskName'
          type='text'
          placeholder='Zadanie'
          required
          maxLength={100}
          value={taskNameValue}
          ref={ref}
          onChange={(e) => handleUserInput(e)}
        />
        {formWarnings.taskName && (
          <FormParagraph warning={true}>{formWarnings.taskName}</FormParagraph>
        )}

        <FormParagraph>Planowana data zakończenia</FormParagraph>
        <FormInput
          id='date'
          name='taskDate'
          type='date'
          value={taskDateValue}
          onChange={(e) => handleUserInput(e)}
        />
        <Priorities>
          <p>Priorytet zadania</p>
          <ul>{generatePriorityStars()}</ul>
        </Priorities>
        <button type='submit'>Dodaj zadanie</button>
      </Form>
    );
  }
);

export default TaskForm;
