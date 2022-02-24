import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedTasks: [],
  displayFilter: 'all',
  errors: '',
  tasksAmount: null,
  tasksFilteredAmount: null,
  tasksList: [],
  tasksListPage: 1,
  tasksPerPage: 10,
  searchedTask: '',
  sortType: 'oldestAdd',
};

export const tasksListSlice = createSlice({
  name: 'tasksList',
  initialState,
  reducers: {
    clearCheckedTasks: (state) => {
      state.checkedTasks = [];
    },
    removeCheckedTask: (state, action) => {
      const checkedTasks = [...state.checkedTasks];
      const taskIndex = checkedTasks.findIndex((task) => task.id === action.payload);
      checkedTasks.splice(taskIndex, 1);
      state.checkedTasks = checkedTasks;
    },
    resetTasksList: () => {
      return { ...initialState };
    },
    setCheckedTask: (state, action) => {
      const checkedTask = state.tasksList.find((task) => task.id === action.payload);
      state.checkedTasks = [...state.checkedTasks, checkedTask];
    },
    setDisplayFilter: (state, action) => {
      state.displayFilter = action.payload;
    },
    setSearchedTask: (state, action) => {
      state.searchedTask = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setTasksAmount: (state, action) => {
      state.tasksAmount = action.payload;
    },
    setTasksFilteredAmount: (state, action) => {
      state.tasksFilteredAmount = action.payload;
    },
    setTasksList: (state, action) => {
      state.tasksList = action.payload;
    },
    setTasksListErrors: (state, action) => {
      if (typeof action.payload === 'string') {
        state.errors = { ...state.errors, tasks: 'Server error: ' + action.payload };
        return;
      }

      const errors = action.payload;
      errors.forEach((error) => {
        const inputName = Object.keys(error);
        const inputError = Object.values(error);
        state.errors = { ...state.errors, [inputName]: inputError };
      });
    },
    setTasksListPage: (state, action) => {
      state.tasksListPage = action.payload;
    },
    setTasksPerPage: (state, action) => {
      state.tasksPerPage = action.payload;
    },
  },
});

export const {
  clearCheckedTasks,
  removeCheckedTask,
  resetTasksList,
  setCheckedTask,
  setDisplayFilter,
  setSearchedTask,
  setSortType,
  setTasksAmount,
  setTasksFilteredAmount,
  setTasksList,
  setTasksListErrors,
  setTasksListPage,
  setTasksPerPage,
} = tasksListSlice.actions;

export default tasksListSlice.reducer;
