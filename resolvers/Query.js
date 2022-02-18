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
  products: (parent, { filter }, { products, reviews }) => {
    let filteredProducts = products;
    if (filter) {
      if (filter.onSale) {
        debug('Filtering Products based on onSale prop');
        filteredProducts = products.filter(
          (product) => product.onSale === filter.onSale
        );
      }

      if (filter.avgRating && [1, 2, 3, 4, 5].includes(filter.avgRating)) {
        debug('Filtering Products based on the rating');

        // Generate productID - rating sum aggregation
        const prodReviewIDMap = {};
        for (const review of reviews) {
          if (prodReviewIDMap[review.productId]) {
            prodReviewIDMap[review.productId] =
              prodReviewIDMap[review.productId] + review.rating;
          } else {
            prodReviewIDMap[review.productId] = review.rating;
          }
        }
        // debug(prodReviewIDMap);

        // Generate ProductId - Count aggregation
        const prodReviewCountMap = {};
        for (const review of reviews) {
          if (prodReviewCountMap[review.productId]) {
            prodReviewCountMap[review.productId]++;
          } else {
            prodReviewCountMap[review.productId] = 1;
          }
        }
        // debug(prodReviewCountMap);

        filteredProducts = products.filter((product) => {
          if (prodReviewCountMap[product.id] && prodReviewIDMap[product.id]) {
            const avgProdRating =
              prodReviewIDMap[product.id] / prodReviewCountMap[product.id];
            return avgProdRating >= filter.avgRating;
          }
        });
      }
    }
    return filteredProducts;
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
