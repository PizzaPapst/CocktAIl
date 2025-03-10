export async function getCocktailById(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${11064}`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.drinks && data.drinks.length > 0) {
          console.log("Cocktail-Details:", data.drinks[0]);
      } else {
          console.log("Keine Details für diesen Cocktail gefunden.");
      }
  } catch (error) {
      console.error("Fehler beim Abrufen der Cocktail-Details:", error);
  }
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
