import { UserInputError } from 'apollo-server-express';
import { v4 as uuidv4 } from 'uuid';

import TasksList from '../../models/TasksList.js';

import { validateTasksFromCSVInput, validateTaskInput } from '../../utils/validator.js';
import verifyAuth from '../../utils/verifyAuth.js';

const taskslist = {
  Mutation: {
    async addTask(_, { input: { body, done, finishDate, priority } }, context) {
      const user = verifyAuth(context);
      const errors = validateTaskInput(body, finishDate, priority);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
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
        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                uncategorizedErrors: 'Nie udało się dodać zadania. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async addTasksFromCSV(_, { input }, context) {
      const user = verifyAuth(context);
      const errors = validateTasksFromCSVInput(input);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        input.forEach((task) =>
          tasksList.tasks.push({
            body: task.body,
            createdAt: new Date().toISOString(),
            done: false,
            id: uuidv4(),
            finishDate: task.finishDate,
            priority: task.priority,
          })
        );

        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                uncategorizedErrors: 'Nie udało się dodać zadań hurtowo. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async deleteTasks(_, { input }, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        input.forEach((taskId) => {
          const taskIndex = tasksList.tasks.findIndex((task) => task.id === taskId);
          if (!taskIndex && taskIndex !== 0) {
            throw new UserInputError('', {
              errors: [
                {
                  tasks: `Nie odnaleziono zadania do usunięcia (id zadania: ${taskId}, operacja usuwania przerwana`,
                },
              ],
            });
          }
          tasksList.tasks.splice(taskIndex, 1);
        });
        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                tasks: 'Nie udało się usunąć. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              tasks: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async deleteAllTasks(_, __, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        tasksList.tasks.splice(0);
        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                uncategorizedErrors: 'Nie udało się usunąć zadań. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async editTask(_, { taskId, input: { body, finishDate, priority } }, context) {
      const user = verifyAuth(context);
      const errors = validateTaskInput(body, finishDate, priority);
      if (errors.length > 0) {
        throw new UserInputError('', { errors });
      }

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        const taskIndex = tasksList.tasks.findIndex((task) => task.id === taskId);
        if (!taskIndex && taskIndex !== 0) {
          throw new UserInputError('', {
            errors: [
              {
                uncategorizedErrors: 'Nie odnaleziono zadania do edycji',
              },
            ],
          });
        }
        let task = tasksList.tasks[taskIndex].toObject();
        task = {
          ...task,
          body,
          finishDate,
          priority,
        };
        tasksList.tasks.splice(taskIndex, 1, task);
        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                uncategorizedErrors: 'Nie udało się edytować zadania. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              uncategorizedErrors: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async toggleTaskDone(_, { taskId, done }, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });
      if (tasksList) {
        const taskIndex = tasksList.tasks.findIndex((task) => task.id === taskId);
        if (!taskIndex && taskIndex !== 0) {
          throw new UserInputError('', {
            errors: [
              {
                tasks: 'Nie odnaleziono zadania do oznaczenia jako zrobione',
              },
            ],
          });
        }
        let task = tasksList.tasks[taskIndex].toObject();
        task = {
          ...task,
          done,
        };
        tasksList.tasks.splice(taskIndex, 1, task);
        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                tasks: 'Nie udało się oznaczyć zadania jako zrobione. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              tasks: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },

    async updateTasksOrder(_, { input }, context) {
      const user = verifyAuth(context);

      const tasksList = await TasksList.findOne({ userId: user.id });

      if (tasksList) {
        if (tasksList.tasks.length > input.length) {
          let tasksWithoutReorderedTasks = [];
          tasksList.tasks.forEach((task) => {
            if (input.some((inputTask) => inputTask.id === task.id)) {
              return;
            } else {
              tasksWithoutReorderedTasks.push(task);
            }
          });
          const mergedTasks = input.concat(tasksWithoutReorderedTasks);

          tasksList.tasks.splice(0);
          tasksList.tasks = mergedTasks;
        } else {
          tasksList.tasks.splice(0);
          tasksList.tasks = input;
        }

        try {
          await tasksList.save();
        } catch (error) {
          throw new UserInputError('', {
            errors: [
              {
                tasks:
                  'Nie udało się zaktualizować kolejności listy zadań na serwerze. Spróbuj ponownie.',
              },
            ],
          });
        }
      } else {
        throw new UserInputError('', {
          errors: [
            {
              tasks: 'Nie odnaleziono tablicy zadań dla użytkownika',
            },
          ],
        });
      }
    },
  },

  Query: {
    async getTasks(
      _,
      { input: { displayFilter, searchedTask, tasksListPage, tasksPerPage, tasksSortType } },
      context
    ) {
      const user = verifyAuth(context);

      const handleSort = (a, b) => {
        const bodyA = a.body.toLowerCase();
        const bodyB = b.body.toLowerCase();
        const createdAtA = a.createdAt;
        const createdAtB = b.createdAt;
        const finishDateA = a.finishDate;
        const finishDateB = b.finishDate;
        const priorityA = a.priority;
        const priorityB = b.priority;

        switch (tasksSortType) {
          case 'own':
            return;
          case 'oldestAdd':
            if (createdAtA > createdAtB) {
              return 1;
            }
            if (createdAtA < createdAtB) {
              return -1;
            }
            return 0;
          case 'newestAdd':
            if (createdAtA > createdAtB) {
              return -1;
            }
            if (createdAtA < createdAtB) {
              return 1;
            }
            return 0;
          case 'earliestFinish':
            if (finishDateA > finishDateB) {
              return 1;
            }
            if (finishDateA < finishDateB) {
              return -1;
            }
            return 0;
          case 'latestFinish':
            if (finishDateA > finishDateB) {
              return -1;
            }
            if (finishDateA < finishDateB) {
              return 1;
            }
            return 0;
          case 'A-Z':
            if (bodyA > bodyB) {
              return 1;
            }
            if (bodyA < bodyB) {
              return -1;
            }
            return 0;
          case 'Z-A':
            if (bodyA > bodyB) {
              return -1;
            }
            if (bodyA < bodyB) {
              return 1;
            }
            return 0;
          case 'highestPriority':
            if (priorityA > priorityB) {
              return -1;
            }
            if (priorityA < priorityB) {
              return 1;
            }
            return 0;
          case 'lowestPriority':
            if (priorityA > priorityB) {
              return 1;
            }
            if (priorityA < priorityB) {
              return -1;
            }
            return 0;

          default:
            break;
        }
      };

      let tasksList;
      try {
        tasksList = await TasksList.findOne({ userId: user.id });
      } catch (error) {
        throw new UserInputError('', {
          errors: [
            {
              tasks: 'Nie udało się pobrać listy zadań. Spróbuj ponownie.',
            },
          ],
        });
      }

      const filteredTasksList = tasksList.tasks
        .filter((task) => task.body.includes(searchedTask.toLowerCase()))
        .filter((task) => {
          if (displayFilter === 'done') {
            return task.done === true;
          } else if (displayFilter == 'undone') {
            return task.done === false;
          } else {
            return task;
          }
        })
        .sort(handleSort);

      const slicedFilteredTasksList = filteredTasksList.slice(
        tasksPerPage * (tasksListPage - 1),
        tasksPerPage * tasksListPage
      );

      return {
        tasks: slicedFilteredTasksList,
        tasksAmount: tasksList.tasks.length,
        tasksFilteredAmount: filteredTasksList.length,
      };
    },
  },
};

export default taskslist;
