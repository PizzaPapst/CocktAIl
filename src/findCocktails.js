import { getCocktailById, getCocktailByingredient } from './Api';

export async function findCocktails(ingredients) {
    const cocktailCounts = new Map();

    // Alle Zutaten-Abfragen parallel starten
    const results = await Promise.all(ingredients.map(ingredient => 
        getCocktailByingredient(ingredient).catch(error => {
            console.error(`Fehler bei ${ingredient}:`, error);
            return []; // Falls ein Fehler auftritt, leeres Array zurückgeben
        })
    ));

    // Ergebnisse verarbeiten
    // Array im inneren mittels flat vereinfachen
    results.flat().forEach(cocktail => {
        const cocktailKey = cocktail.idDrink;
        // Überprüfen ob Cocktail bereits in cocktail Map und um 1 erhöhen
        cocktailCounts.set(cocktailKey, (cocktailCounts.get(cocktailKey) || 0) + 1);
    });

    // Gruppierung nach Anzahl der Übereinstimmungen
    const groupedCocktails = {};
    // Objekt erstellen indem die zuvor gezählte Anzahl der Zutaten sortiert wird
    cocktailCounts.forEach((count, cocktailId) => {
        if (!groupedCocktails[count]) {
            groupedCocktails[count] = [];
        }
        groupedCocktails[count].push(cocktailId);
    });

    return groupedCocktails;
}

export async function getCocktailDetails(id, ingredients) {
    
    
}
