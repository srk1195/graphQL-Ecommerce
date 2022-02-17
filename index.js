const debug = require('debug')(`app:index:👍`);
const { ApolloServer } = require('apollo-server');

// Get The Data
const { products, categories, reviews } = require('./productData');

// Get all Resolvers
const { Query } = require('./resolvers/Query');
const { Product } = require('./resolvers/Product');
const { Category } = require('./resolvers/Category');

// Type Defs, Resolvers & Context
const { typeDefs } = require('./schema');
const resolvers = { Query, Category, Product };
const context = { products, categories, reviews };

// Create an Apollo Server!
const server = new ApolloServer({ typeDefs, resolvers, context });

server
  .listen()
  .then(({ url }) => {
    debug('server listening on ' + url);
  })
  .catch((err) => {
    debug('Error Happened: ' + err);
  });
