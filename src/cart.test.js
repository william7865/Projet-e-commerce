
const { getCart, addToCart, removeFromCart, clearCart, getTotals } = require('./cart');

// Mock de localStorage pour simuler le comportement dans un environnement de test
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

// Testez chaque fonction individuellement

describe('getCart', () => {
  it('returns an empty array if localStorage is empty', () => {
    localStorage.getItem.mockReturnValueOnce(null);

    const cart = getCart();

    expect(cart).toEqual([]);
    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
  });

  it('returns the parsed cart from localStorage', () => {
    const mockCart = [{ id: '1', name: 'Product', price: 10, quantity: 2 }];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockCart));

    const cart = getCart();

    expect(cart).toEqual(mockCart);
    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
  });
});

describe('addToCart', () => {
  it('adds a product to the cart', () => {
    const mockProduct = { id: '1', name: 'New Product', price: 15 };
    localStorage.getItem.mockReturnValueOnce(JSON.stringify([]));

    addToCart(mockProduct);

    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{ ...mockProduct, quantity: 1 }]));
  });

  // Add more test cases for different scenarios
});

describe('removeFromCart', () => {
  // Add test cases for removeFromCart
});

describe('clearCart', () => {
  // Add test cases for clearCart
});

describe('getTotals', () => {
  // Add test cases for getTotals
});
