export function getCocktailById(id) {
    return a + b;
}

export async function getCocktailByingredient(ingredient) {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Gefundene Cocktails:", data.drinks);
      return data; 
  } catch (error) {
      console.error("Fehler beim Abrufen der Cocktails:", error);
  }
}
