import type { iIngredient } from '@/types/types.ts'

export function ingredientsPrettier(ingredients: iIngredient[]): string[] {
  return ingredients.map((ingredient) => {
    if (ingredient.value) {
      return `${ingredient.name} - ${ingredient.value}`
    } else {
      return ingredient.name
    }
  })
}
