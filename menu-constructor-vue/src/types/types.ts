export interface iReceipt {
  "name": string,
  "mealType": string,
  "id": number,
  "ingredients": iIngredient[],
  "howToCook": string,
}

interface iIngredient {
  name: string,
  value: string
}
