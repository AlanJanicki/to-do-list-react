import { gql } from 'apollo-server';

const typeDefs = gql`
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
    userId: ID!
  }

  type User {
    avatar: String!
    createdAt: String!
    id: ID!
    login: String!
    name: String!
    token: String
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

  type Mutation {
    createTask(input: TaskInput): TasksList!
    deleteTask(taskId: ID!): TasksList!
    deleteAllTasks: TasksList!
    editTask(taskId: ID!, input: TaskInput): TasksList!
    login(login: String!, password: String!): User!
    register(input: RegisterInput): User!
    updateTasksOrder(input: [TaskInput]): TasksList!
    updateUserAvatar(avatar: String!): User!
    updateUserPassword(input: ChangePasswordInput!): User!
  }

  type Query {
    getTasks: TasksList
  }
`;

export default typeDefs;
