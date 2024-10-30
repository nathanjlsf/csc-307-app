// module.test.js
import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing div -- division', () => {
    const expected = 11;
    const got = mut.div(22, 2);
    expect(got).toBe(expected);
});

test('Testing div -- division with decimals', () => {
    const expected = 4.5;
    const got = mut.div(9, 2);
    expect(got).toBeCloseTo(expected);
});

test('Testing div -- dividing large numbers', () => {
    const expected = 6e9;
    const got = mut.div(12e9, 2);
    expect(got).toBe(expected);
});

test('Testing div -- dividing by zero', () => {
    expect(() => {
        mut.div(3, 0);
    }).toThrow('Error: Dividing by zero is not allowed');
});

test('Testing div -- dividing small decimal values', () => {
    const expected = 0.025;
    const got = mut.div(0.0005, 0.02);
    expect(got).toBeCloseTo(expected);
});

test('Testing div -- dividing with negative numbers', () => {
    const expected = -26;
    const got = mut.div(-52, 2);
    expect(got).toBe(expected);
});


test('Testing containsNumbers -- numbers', () => {
    const text = '12345';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- empty string', () => {
    const text = '';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

test('Testing containsNumbers -- numbers characters and special characters', () => {
    const text = 'qwerty123!*&';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- only special characters', () => {
    const text = '$%#^&';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

test('Testing containsNumbers -- decimal numbers', () => {
    const text = '3.1415';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- exponential numbers', () => {
    const text = '7e8';
    const result = mut.containsNumbers(text);
    expect(result).toBe(true);
});

test('Testing containsNumbers -- no numbers', () => {
    const text = 'Software Engineering';
    const result = mut.containsNumbers(text);
    expect(result).toBe(false);
});

