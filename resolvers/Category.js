const debug = require('debug')(`app:Category:🐈`);

exports.Category = {
  products: (parent, { filter }, { products }) => {
    // To filter the products based on category + onSale prop
    if (filter) {
      if (filter.onSale) {
        debug('Filtering based on onSale prop with category');
        return products.filter(
          (product) =>
            product.categoryId === parent.id && product.onSale === filter.onSale
        );
      }
    }

    // Return all products as it is
    return products.filter((product) => product.categoryId === parent.id);
  },
};
