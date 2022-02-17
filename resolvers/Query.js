const debug = require('debug')(`app:Query:🥂`);

exports.Query = {
  fruit: (parent, args, context) => {
    context.sayHello();
    return 'Apple';
  },
  count: (parent, args, context) => {
    return 20;
  },
  price: (parent, args, context) => {
    return 12.02;
  },
  available: (parent, args, context) => {
    return false;
  },
  products: (parent, args, { products }) => {
    return products;
  },
  product: (parent, args, context) => {
    debug('In Query-> product resolver');
    const findProd = context.products.find((item) => item.id === args['id']);
    if (!findProd) {
      return null;
    }
    return findProd;
  },
  categories: (parent, args, { categories }) => {
    return categories;
  },
  category: (parent, args, { categories }) => {
    return categories.find((item) => item.id === args.id);
  },
  reviews: (parent, args, context) => {
    return context.reviews;
  },
  review: (parent, args, { reviews }) => {
    return reviews.find((item) => item.id === args.id);
  },
};
