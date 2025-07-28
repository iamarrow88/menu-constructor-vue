export function arrayIsNotEmpty(array: {}) {
  if (array instanceof Array) {
    return array.length !== 0
  }
}
