const localStorageCartName = "cart";

const getCart = () => {
  const cart = JSON.parse(localStorage.getItem(localStorageCartName));

  if (!cart) {
    return [];
  }

  console.log(cart);

  return cart;
};

const addToCart = (product) => {
  const tab = getCart();

  const index = tab.findIndex((p) => p.id === product.id);

  if (index === -1) {
    tab.push({ ...product, quantity: 1 });
  } else {
    tab[index].quantity++;
  }

  localStorage.setItem(localStorageCartName, JSON.stringify(tab));
};

const removeFromCart = (product) => {
  const tab = getCart();

  const index = tab.findIndex((p) => p.id === product.id);

  if (index === -1) {
    return;
  }

  if (tab[index].quantity > 1) {
    tab[index].quantity--;
  } else {
    tab.splice(index, 1);
  }

  localStorage.setItem(localStorageCartName, JSON.stringify(tab));
};

const clearCart = () => {
  localStorage.removeItem(localStorageCartName);
};

const getTotals = () => {
  const cart = getCart();

  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const items = cart.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return { total, items };
};
