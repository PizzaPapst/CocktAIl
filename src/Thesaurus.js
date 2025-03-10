const thesaurus = {
    "orange juice": ["ORANGE", "ORANGENSAFT", "ORANG", "ORANGEN NEKTAR"],
    "milk": ["MILCH", "MILK", "LAIT"],
    "banana": ["BANANE", "BANANEN", "BANANA"],
    "apple": ["APFEL", "APPLE", "ÄPFEL"]
};

// Funktion zum Suchen
export function getIngredient(word) {
    word = word.toUpperCase();
    for (const [ingredient, synonyms] of Object.entries(thesaurus)) {
        if (synonyms.includes(word)) {
            return ingredient;
        }
    }
    return "Unbekannte Zutat";
}

export default thesaurus;
