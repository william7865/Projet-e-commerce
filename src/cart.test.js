// sum.test.js
const sum = require('./cart'); // Utilisation du chemin relatif sans extension
javascript
import { getCart, addToCart, removeFromCart, clearCart, getTotals } from './cartFunctions'; // Importing functions from cartFunctions file (assuming the code is in cartFunctions.js)
import localStorage from 'jest-localstorage-mock'; // Mocking localStorage
jest.mock('./cartFunctions'); // If the functions are being exported

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe('localStorage cart operations', () => {
  const product1 = { id: 'p1', price: 10 };
  const product2 = { id: 'p2', price: 20 };

  test('getCart should return empty array when cart is empty', () => {
    expect(getCart()).toEqual([]);
  });

  test('addToCart should add a new product to the cart', () => {
    addToCart(product1);
    expect(getCart()).toEqual([{ ...product1, quantity: 1 }]);
  });

  test('addToCart should increment quantity if product already in cart', () => {
    addToCart(product1);
    addToCart(product1);
    expect(getCart()).toEqual([{ ...product1, quantity: 2 }]);
  });

  test('removeFromCart should decrement quantity if more than one', () => {
    addToCart(product1);
    addToCart(product1);
    removeFromCart(product1);
    expect(getCart()).toEqual([{ ...product1, quantity: 1 }]);
  });

  test('removeFromCart should remove product if quantity is one', () => {
    addToCart(product1);
    removeFromCart(product1);
    expect(getCart()).toEqual([]);
  });

  test('removeFromCart should do nothing if product not in cart', () => {
    addToCart(product2);
    removeFromCart(product1);
    expect(getCart()).toEqual([{ ...product2, quantity: 1 }]);
  });

  test('clearCart should remove all items from the cart', () => {
    addToCart(product1);
    clearCart();
    expect(getCart()).toEqual([]);
  });

  test('getTotals should return correct total and items count', () => {
    addToCart(product1);
    addToCart(product2);
    addToCart(product2);
    expect(getTotals()).toEqual({ total: 50, items: 3 });
  });

  test('getTotals should return zero totals when cart is empty', () => {
    expect(getTotals()).toEqual({ total: 0, items: 0 });
  });
});