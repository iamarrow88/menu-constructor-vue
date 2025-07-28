export interface iMealType {
  breakfast: boolean
  lunch: boolean
  snack: boolean
  dinner: boolean
}

export interface iReceipt {
  _id?: string
  name: string
  mealType: iMealType
  ingredients: iIngredient[]
  howToCook: string
  tags: string[]
}

export interface iCustomError {
  errNumber: number
  message: string
}

export interface iIngredient {
  name: string
  value: string
}
