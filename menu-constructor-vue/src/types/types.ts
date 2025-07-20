export interface iReceipt {
  "name": string,
  "mealType": {
    "breakfast": boolean,
    "lunch": boolean,
    "snack": boolean,
    "dinner": boolean,
  },
  "ingredients": iIngredient[],
  "howToCook": string,
  tags: string[],
}

interface iIngredient {
  name: string,
  value: string
}
