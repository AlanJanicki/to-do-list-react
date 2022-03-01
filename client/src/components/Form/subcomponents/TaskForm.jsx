import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import Papa from 'papaparse';

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Form,
  FormInput,
  FormParagraph,
  FormTextArea,
  LoadingSpinner,
  Priorities,
  Priority,
  UploadFile,
} from '../styles/StyledForm';

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
      loadingAddTasksFromCSV,
      loadingEditTask,
      tasksFromCSV,
      taskBodyValue,
      taskFinishDateValue,
      taskPriorityValue,
      setFormType,
    },
    ref
  ) => {
    const isDarkModeActive = useSelector((state) => state.auth.user.enabledDarkMode);
    const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);

    useEffect(() => {
      if (addTaskForm) {
        setFormType('addTaskForm');
      } else if (editTaskForm) {
        setFormType('editTaskForm');
      }
      if (tasksFromCSV.length > 0) {
        setFormType('addTasksFromCSVForm');
      }
    }, [addTaskForm, editTaskForm, setFormType, tasksFromCSV]);

    const generatePriorityStars = () => {
      let stars = [];
      const priorityStars = [];

      for (let i = 1; i < 4; i++) {
        stars = [...stars, <FontAwesomeIcon key={i} icon={faStar} />];

        priorityStars.push(
          <Priority isDarkModeActive={isDarkModeActive} key={i} amount={i}>
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

    const handleKeyboardOperation = (e) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.target.click();
      }
    };

    const handleUploadTasksInCSV = (e) => {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (res) => {
          handleUserInput(res.data);
        },
      });
    };

    return (
      <Form isDarkModeActive={isDarkModeActive} onSubmit={handleSubmitForm}>
        {handleErrorInformation()}
        {tasksFromCSV.length === 0 && (
          <>
            {formErrors.taskBody && (
              <FormParagraph error={true}>{formErrors.taskBody}</FormParagraph>
            )}
            <FormTextArea
              disabled={isLogoutTimeoutModalOpen}
              name='taskBody'
              maxLength={100}
              type='text'
              placeholder='Zadanie'
              required={tasksFromCSV.length === 0}
              value={taskBodyValue}
              isDarkModeActive={isDarkModeActive}
              ref={ref}
              onChange={(e) => handleUserInput(e)}
            />
            {formWarnings.taskBody && (
              <FormParagraph warning={true}>{formWarnings.taskBody}</FormParagraph>
            )}

            {formErrors.taskFinishDate && (
              <FormParagraph error={true}>{formErrors.taskFinishDate}</FormParagraph>
            )}
            <FormParagraph isDarkModeActive={isDarkModeActive}>
              Planowana data zakończenia
            </FormParagraph>
            <FormInput
              disabled={isLogoutTimeoutModalOpen}
              id='date'
              min={handleMinDateInput()}
              name='taskFinishDate'
              type='datetime-local'
              value={taskFinishDateValue}
              isDarkModeActive={isDarkModeActive}
              onChange={(e) => handleUserInput(e)}
            />
            <Priorities isDarkModeActive={isDarkModeActive}>
              {formErrors.taskPriority && (
                <FormParagraph error={true}>{formErrors.taskPriority}</FormParagraph>
              )}
              <p>Priorytet zadania</p>
              <ul>
                {editTaskForm && (
                  <Priority isDarkModeActive={isDarkModeActive}>
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
          </>
        )}

        {formErrors.tasksFromCSV && (
          <FormParagraph error={true}>{formErrors.tasksFromCSV}</FormParagraph>
        )}
        {!editTaskForm && (
          <UploadFile isDarkModeActive={isDarkModeActive}>
            <label
              disabled={isLogoutTimeoutModalOpen || loadingAddTask || loadingAddTasksFromCSV}
              htmlFor='tasksInCSV'
              tabIndex={isLogoutTimeoutModalOpen || loadingAddTask ? '-1' : '0'}
              onKeyDown={(e) => handleKeyboardOperation(e)}>
              Dodaj zadania hurtowo (z pliku CSV)
            </label>
            <input
              accept='.csv'
              id='tasksInCSV'
              name='tasksInCSV'
              type='file'
              onChange={handleUploadTasksInCSV}
            />
          </UploadFile>
        )}

        {tasksFromCSV.length > 0 && formErrors.tasksFromCSV.length === 0 && (
          <FormParagraph isDarkModeActive={isDarkModeActive}>
            Zadania z pliku załadowane poprawnie, zatwierdź aby dodać
          </FormParagraph>
        )}
        <button disabled={isLogoutTimeoutModalOpen || loadingAddTask} type='submit'>
          {addTaskForm && tasksFromCSV.length === 0
            ? 'Dodaj zadanie'
            : tasksFromCSV.length === 0 && 'Edytuj zadanie'}
          {tasksFromCSV.length > 0 && 'Zatwierdź'}
          {(loadingAddTask || loadingEditTask || loadingAddTasksFromCSV) && <LoadingSpinner />}
        </button>
      </Form>
    );
  }
);

export default TaskForm;
