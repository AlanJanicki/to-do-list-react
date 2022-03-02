import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';
import path from 'path';

import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/typeDefs.js';

const PORT = process.env.PORT || 4002;
const __dirname = path.resolve();

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });
await server.start();

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public/images')));

app.use(graphqlUploadExpress());

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected');
    return app.listen({ port: PORT });
  })
  .then(() => {
    console.log(`Servers is running at ${server.graphqlPath}`);
  })
  .catch((err) => console.log(err));
