export function extractObjectKeysNames(array: { name: string; value: string }[]) {
  try {
    const names = array.map((item) => item.name)
    return names.join(', ')
  } catch (e) {
    console.error(e)
  }
}
