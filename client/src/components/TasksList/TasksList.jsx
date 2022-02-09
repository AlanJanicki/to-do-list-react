import { useState } from 'react';

import { useSelector } from 'react-redux';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

import { TaskDate, TaskError, TasksListWrapper } from './styles/StyledTasksList.js';

import Task from '../Task/Task';
import Pagination from '../Pagination/Pagination.jsx';

const tasks = [
  {
    id: 'first',
    content:
      '1 Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.',
  },
  {
    id: 'second',
    content:
      '2 Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor',
  },
  {
    id: 'third',
    content: '3 Lorem ipsum dolor sit amet.',
  },
];

const TasksList = () => {
  const [tasksOrderDD, setTasksOrderDD] = useState(tasks);

  const accountMenuHeight = useSelector((state) => state.layout.accountMenuHeight);
  const controlPanelHeight = useSelector((state) => state.layout.controlPanelHeight);
  const headerHeight = useSelector((state) => state.layout.headerHeight);
  const isAccountMenuOpen = useSelector((state) => state.layout.isAccountMenuOpen);
  const isLogoutTimeoutModalOpen = useSelector((state) => state.modal.isLogoutTimeoutModalOpen);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const tasks = Array.from(tasksOrderDD);
    const [reorderedTask] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderedTask);
    setTasksOrderDD(tasks);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId='tasks'>
          {(provided) => (
            <TasksListWrapper
              accountMenuHeight={accountMenuHeight}
              controlPanelHeight={controlPanelHeight}
              headerHeight={headerHeight}
              isAccountMenuOpen={isAccountMenuOpen}
              ref={provided.innerRef}
              {...provided.droppableProps}>
              <TaskError>Błąd. Spróbuj ponownie!</TaskError>
              <TaskDate>2022-01-30</TaskDate>
              {tasksOrderDD.map(({ id, content }, index) => {
                return (
                  <Draggable
                    draggableId={id}
                    index={index}
                    isDragDisabled={isModalOpen || isLogoutTimeoutModalOpen}
                    key={id}>
                    {(provided) => (
                      <Task innerRef={provided.innerRef} provided={provided}>
                        {content}
                      </Task>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </TasksListWrapper>
          )}
        </Droppable>
      </DragDropContext>
      <Pagination />
    </>
  );
};

export default TasksList;
