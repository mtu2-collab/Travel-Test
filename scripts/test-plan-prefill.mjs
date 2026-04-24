import { getPrefilledDestination } from '../src/pages/planPrefill.js'

function expectEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: '${expected}'\nActual: '${actual}'`)
  }
}

const paramsWithValue = new URLSearchParams('destination=Hoi%20An%2C%20Vietnam')
expectEqual(getPrefilledDestination(paramsWithValue), 'Hoi An, Vietnam', 'Should decode and return destination from URL query')

const emptyParams = new URLSearchParams('')
expectEqual(getPrefilledDestination(emptyParams), '', 'Should return empty string when destination missing')

const paddedValue = new URLSearchParams('destination=%20Lisbon%20')
expectEqual(getPrefilledDestination(paddedValue), 'Lisbon', 'Should trim whitespace')

console.log('✅ Plan prefill utility tests passed.')
