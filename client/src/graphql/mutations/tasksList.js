import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation AddTask($input: TaskInput!) {
    addTask(input: $input)
  }
`;

export const DELETE_TASKS = gql`
  mutation DeleteTasks($input: [ID]!) {
    deleteTasks(input: $input)
  }
`;

export const DELETE_ALL_TASKS = gql`
  mutation DeleteAllTasks {
    deleteAllTasks
  }
`;

export const EDIT_TASK = gql`
  mutation EditTask($input: TaskInput!, $taskId: ID!) {
    editTask(input: $input, taskId: $taskId)
  }
`;

export const TOGGLE_TASK_DONE = gql`
  mutation ToggleTaskDone($taskId: ID!, $done: Boolean!) {
    toggleTaskDone(taskId: $taskId, done: $done)
  }
`;

export const UPDATE_TASKS_ORDER = gql`
  mutation UpdateTasksOrder($input: [TaskInput]!) {
    updateTasksOrder(input: $input)
  }
`;
