import type { iMealType } from '@/types/types.ts'

export function translateMealType(rawMealType: iMealType): string {
  const mealTypes: Record<keyof iMealType, string> = {
    breakfast: 'Завтрак',
    lunch: 'Обед',
    snack: 'Перекус',
    dinner: 'Ужин',
  }
  const keys = Object.keys(rawMealType) as (keyof iMealType)[]
  const mealTypesArray: string[] = []
  keys.forEach((key) => {
    if (Object.keys(mealTypes).includes(key) && Boolean(rawMealType[key])) {
      mealTypesArray.push(mealTypes[key])
    }
  })

  return mealTypesArray.join(', ')
}
