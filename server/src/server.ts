import express from 'express';
import cors from 'cors';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();
  await db();

  const PORT = process.env.PORT || 3001;
  const app = express();

  // Enable CORS
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Handle preflight requests
  app.options('/graphql', cors({ origin: 'http://localhost:3000', credentials: true }));

  // Apply Apollo Server middleware with CORS
  app.use(
    '/graphql',
    cors({ origin: 'http://localhost:3000', credentials: true }),
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer();