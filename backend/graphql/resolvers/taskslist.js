import { UserInputError } from 'apollo-server';
import { v4 as uuidv4 } from 'uuid';

import TasksList from '../../models/TasksList.js';

import { validateTaskInput } from '../../utils/validator.js';
import verifyAuth from '../../utils/verifyAuth.js';

const taskslist = {
  Mutation: {
    async createTask(_, { input: { body, done, finishDate, priority } }, context) {
      const user = verifyAuth(context);
      const errors = validateTaskInput(body, done, finishDate, priority);
      if (errors.length > 0) {
        throw new UserInputError('Błędy', { errors });
      }

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        tasksList.tasks.push({
          body,
          createdAt: new Date().toISOString(),
          done,
          id: uuidv4(),
          finishDate,
          priority,
        });
        await tasksList.save();
      } else {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
          },
        });
      }

      return tasksList;
    },

    async deleteTask(_, { taskId }, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        const taskIndex = tasksList.tasks.findIndex((task) => task.id === taskId);
        if (!taskIndex && taskIndex !== 0) {
          throw new UserInputError('Błąd', {
            errors: {
              tasks: 'Nie odnaleziono zadania do usunięcia',
            },
          });
        }
        tasksList.tasks.splice(taskIndex, 1);
        await tasksList.save();
      } else {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
          },
        });
      }

      return tasksList;
    },

    async deleteAllTasks(_, __, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        tasksList.tasks.splice(0);
        await tasksList.save();
      } else {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
          },
        });
      }

      return tasksList;
    },

    async editTask(_, { taskId, input: { body, done, finishDate, priority } }, context) {
      const user = verifyAuth(context);
      const errors = validateTaskInput(body, done, finishDate, priority);
      if (errors.length > 0) {
        throw new UserInputError('Błędy', { errors });
      }

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        const taskIndex = tasksList.tasks.findIndex((task) => task.id === taskId);
        if (!taskIndex && taskIndex !== 0) {
          throw new UserInputError('Błąd', {
            errors: {
              tasks: 'Nie odnaleziono zadania do edycji',
            },
          });
        }
        let task = tasksList.tasks[taskIndex].toObject();
        task = {
          ...task,
          body,
          done,
          finishDate,
          priority,
        };
        tasksList.tasks.splice(taskIndex, 1, task);
        await tasksList.save();
      } else {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
          },
        });
      }

      return tasksList;
    },

    async updateTasksOrder(_, { input }, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        tasksList.tasks.splice(0);
        tasksList.tasks = input;
        await tasksList.save();
      } else {
        throw new UserInputError('Błąd', {
          errors: {
            uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
          },
        });
      }

      return tasksList;
    },
  },

  Query: {
    async getTasks(_, __, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });

      return tasksList;
    },
  },
};

export default taskslist;
