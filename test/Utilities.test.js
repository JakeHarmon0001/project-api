/**
 * Test suite for utilities' functions
 */

const utility = require("../Utilities.js"); //importing functions from Utilities.js

/**
 * +tests for invalid ids
 */
test('returns false for invalid Id 00001', () => {
  expect(utility.isValidId('00001')).toBe(false)
})
test('returns false for invald Id 001', () => {
  expect(utility.isValidId('001')).toBe(false)
})
test('returns false for invald Id -001', () => {
  expect(utility.isValidId('-001')).toBe(false)
})
test('returns false for invald Id iiii', () => {
  expect(utility.isValidId('')).toBe(false)
})




