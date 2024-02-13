// cart.js

const localStorageCartName = "cart";

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem(localStorageCartName)) || [];
  return cart;
};

const addToCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === product.id);

  if (index === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[index].quantity++;
  }

  localStorage.setItem(localStorageCartName, JSON.stringify(cart));
};

const removeFromCart = (product) => {
  const cart = getCart();
  const index = cart.findIndex((p) => p.id === product.id);

  if (index !== -1) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }

    localStorage.setItem(localStorageCartName, JSON.stringify(cart));
  }
};

const clearCart = () => {
  localStorage.removeItem(localStorageCartName);
};

const getTotals = () => {
  const cart = getCart();

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const items = cart.reduce((acc, product) => acc + product.quantity, 0);

  return { total, items };
};

module.exports = { getCart, addToCart, removeFromCart, clearCart, getTotals };
