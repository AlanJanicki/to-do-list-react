import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Upload

  type Task {
    body: String!
    createdAt: String!
    done: Boolean
    finishDate: String
    id: ID!
    priority: String
  }

  type TasksList {
    tasks: [Task]
    tasksAmount: Int
    tasksFilteredAmount: Int
  }

  type User {
    avatar: String!
    createdAt: String!
    enabledDarkMode: Boolean!
    id: ID!
    login: String!
    name: String!
    ownAvatar: String
    token: String!
  }

  input ChangePasswordInput {
    newPassword: String!
    newPasswordRepeated: String!
    oldPassword: String!
  }

  input RegisterInput {
    avatar: String!
    login: String!
    name: String!
    password: String!
    passwordRepeated: String!
  }

  input TaskInput {
    body: String!
    createdAt: String
    done: Boolean
    finishDate: String
    id: ID
    priority: String
  }

  input QueryInput {
    displayFilter: String
    searchedTask: String
    tasksSortType: String
    tasksListPage: Int
    tasksPerPage: Int
  }

  type Mutation {
    addTask(input: TaskInput!): Boolean
    addTasksFromCSV(input: [TaskInput]!): Boolean
    deleteTasks(input: [ID]!): Boolean
    deleteAllTasks: Boolean
    deleteUser: Boolean
    editTask(taskId: ID!, input: TaskInput!): Boolean
    login(login: String!, password: String!): User!
    toggleDarkMode(darkModeState: Boolean!): User!
    toggleTaskDone(taskId: ID!, done: Boolean!): Boolean
    register(input: RegisterInput!): Boolean
    updateTasksOrder(input: [TaskInput]!): Boolean
    updateUserAvatar(avatar: String, ownAvatar: Upload): User!
    updateUserPassword(input: ChangePasswordInput!): User!
  }

  type Query {
    getTasks(input: QueryInput): TasksList!
  }
`;

export default typeDefs;
