import type {iIngredient} from "@/types/types.ts";

export function formatIngredients(rawIngredients: string, separator: string): iIngredient[] | undefined {
  try {
    const lines = rawIngredients.replace(/\n|\r\n|\r/g, '<br>').split('<br>')
    const ingredients: iIngredient[] = []
    lines.forEach((line) => {
      const acc: iIngredient = {
        "value": "",
        "name": "",
      }
      const [ingredient, value] = line.split(separator);
      const isIngredientNameExist = Boolean(ingredient)
      const isIngredientValueExist = Boolean(value)
      if (isIngredientNameExist) {
        acc['name'] = Boolean(ingredient) ? ingredient.trim() : ''
        if (isIngredientValueExist) {
          acc['value'] = Boolean(value) ? value.trim() : ''
        }
        ingredients.push(acc)

      }
    })
    return ingredients
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message)
    }
    return undefined;
  }
}
