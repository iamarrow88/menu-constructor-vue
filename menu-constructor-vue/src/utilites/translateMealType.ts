export function translateMealType(rawMealType: string): string {
  const mealTypes = {
    'breakfast': 'Завтрак',
    'snack': 'Перекус',
    'lunch': 'Обед',
    'dinner': 'Ужин',
  }

  return mealTypes[rawMealType] ? mealTypes[rawMealType] : 'Вид приема пищи не определен';
}
