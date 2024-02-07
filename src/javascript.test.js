// sum.test.js
const sum = require('./javascript'); // Utilisation du chemin relatif sans extension

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
})