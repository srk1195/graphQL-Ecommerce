const debug = require('debug')(`app:Product🧃`);

exports.Product = {
  category: (parent, args, { categories }) => {
    return categories.find((item) => item.id === parent.categoryId);
  },
  reviews: (parent, args, { reviews }) => {
    debug('In product -> reviews resolver');
    return reviews.filter((review) => review.productId === parent.id);
  },
};
