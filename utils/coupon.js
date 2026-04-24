
module.exports = (total, desconto) => {
  return total - (total * desconto / 100);
};
