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
      taskFinishDateValue,
      taskBodyValue,
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
        stars = [...stars, <FontAwesomeIcon key={i} icon={faStar} />];

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
        {formErrors.taskBody && <FormParagraph error={true}>{formErrors.taskBody}</FormParagraph>}
        <FormTextArea
          name='taskBody'
          type='text'
          placeholder='Zadanie'
          required
          maxLength={100}
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
          id='date'
          name='taskFinishDate'
          type='date'
          value={taskFinishDateValue}
          onChange={(e) => handleUserInput(e)}
        />
        <Priorities>
          {formErrors.taskPriority && (
            <FormParagraph error={true}>{formErrors.taskPriority}</FormParagraph>
          )}
          <p>Priorytet zadania</p>
          <ul>{generatePriorityStars()}</ul>
        </Priorities>
        <button type='submit'>Dodaj zadanie</button>
      </Form>
    );
  }
);

export default TaskForm;
