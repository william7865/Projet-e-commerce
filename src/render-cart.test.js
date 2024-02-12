const sum = require('./render-cart');
javascript
// Test file imports
import '@testing-library/jest-dom';
import { renderCartItems } from './renderCartItems'; // Adjust the import path according to the actual file location

// Jest tests
describe('renderCartItems', () => {
  let container;

  beforeEach(() => {
    // Setting up a mock container before each test
    container = document.createElement('div');
    container.id = 'cart-container';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup after each test
    document.body.removeChild(container);
  });

  test('should populate the cart container with items', () => {
    const cartItems = [
      { id: '1', name: 'Product 1', price: '10.99', quantity: 2 },
      { id: '2', name: 'Product 2', price: '5.49', quantity: 1 },
    ];

    renderCartItems(cartItems);

    const divs = container.getElementsByTagName('div');
    expect(divs.length).toBe(cartItems.length);

    cartItems.forEach((item, index) => {
      const itemElement = divs[index];
      expect(itemElement.innerHTML).toContain(`ID: ${item.id}`);
      expect(itemElement.innerHTML).toContain(`Nom: ${item.name}`);
      expect(itemElement.innerHTML).toContain(`Prix: ${item.price}`);
      expect(itemElement.innerHTML).toContain(`Quantité: ${item.quantity}`);
    });
  });

  test('should clear previous content before adding new items', () => {
    container.innerHTML = '<div>Previous item</div>';
    
    const cartItems = [{ id: '1', name: 'Product 1', price: '10.99', quantity: 2 }];
    renderCartItems(cartItems);

    expect(container.innerHTML).not.toContain('Previous item');
    expect(container.children.length).toBe(1);
  });

  test('should handle an empty cart by clearing previous content', () => {
    container.innerHTML = '<div>Previous item</div>';

    renderCartItems([]);

    expect(container.innerHTML).toBe('');
  });

  test('should log an error if cart-container does not exist', () => {
    document.body.removeChild(container);
    console.error = jest.fn();

    const cartItems = [{ id: '1', name: 'Product 1', price: '10.99', quantity: 2 }];
    renderCartItems(cartItems);

    expect(console.error).toHaveBeenCalledWith("Le conteneur du panier n'a pas été trouvé dans le HTML.");
  });

  test('should not throw an error if cart-container exists but is empty', () => {
    const cartItems = [];
    expect(() => renderCartItems(cartItems)).not.toThrow();
  });
});
