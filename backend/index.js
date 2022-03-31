import { ApolloServer } from 'apollo-server';
import 'dotenv/config';
import mongoose from 'mongoose';

import resolvers from './graphql/resolvers/index.js';
import typeDefs from './graphql/typeDefs.js';

const PORT = process.env.PORT || 4002;

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ req }) });

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then(({ url }) => {
    console.log(`Servers is running at ${url}`);
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
    process.exit(1);
  });
