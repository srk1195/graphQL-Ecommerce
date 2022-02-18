const { gql } = require('apollo-server');

// String, Int, Float,Boolean, ID - are scalar types
// ! is to make that not-null field
exports.typeDefs = gql`
  type Query {
    fruit: String!
    count: Int
    price: Float
    available: Boolean
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
    reviews: [Review!]
    review(id: ID!): Review
  }

  # Product is an Object Type
  type Product {
    id: String!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: ID!
    category: Category
    reviews: [Review]
  }

  # Category is of an Object Type
  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  # Review is of an Object Type
  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }

  # If we need only a set of products based on a filter, like onSale.
  # Then, we cannot add something like products ({filter:Onsale:true})
  # since it is not a scalar type then we need to define the schema for it.

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }
`;
