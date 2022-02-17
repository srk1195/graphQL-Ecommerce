exports.Category = {
  products: (parent, args, { products }) => {
    return products.filter((item) => item.categoryId === parent.id);
  },
};
