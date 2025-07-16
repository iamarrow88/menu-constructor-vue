export function formatIngredients(rawIngredients: string): iIngredient[] {
  try {
    const lines = rawIngredients.replace(/\n|\r\n|\r/g, "<br>").split('<br>');

    try {
      const ingredients = [];
      lines.map(line => {
        const acc = {};
        const [ ingredient, count ] = line.split('-');
        acc["value"] = Boolean(count) ? count.trim() : '';
        acc["name"] = Boolean(ingredient) ? ingredient.trim() : '';
        ingredients.push(acc);
      })
      return ingredients;
    } catch (e) {
      console.log(e.message);
    }
  } catch (e) {
    console.log(e.message);
  }
}
