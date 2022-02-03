import taskslist from './taskslist.js';
import user from './user.js';

const resolvers = {
  Mutation: {
    ...taskslist.Mutation,
    ...user.Mutation,
  },
  Query: {
    ...taskslist.Query,
  },
};

export default resolvers;
