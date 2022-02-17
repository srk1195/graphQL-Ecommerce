const { gql } = require('apollo-server');

// String, Int, Float,Boolean, ID - are scalar types
// ! is to make that not-null field
exports.typeDefs = gql`
  type Query {
    fruit: String!
    count: Int
    price: Float
    available: Boolean
    products: [Product!]!
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
    products: [Product!]!
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
`;
