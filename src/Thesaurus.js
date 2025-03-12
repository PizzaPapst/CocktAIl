const thesaurus = {
    "light rum": ["weißer rum", "licht rum", "heller rum"],
    "dark rum": ["dunkler rum", "brauner rum", "gereifter rum"],
    "spiced rum": ["gewürzter rum", "aromatisierter rum"],
    "bourbon": ["bourbon whisky", "bourbon whiskey"],
    "rye whiskey": ["roggen whisky", "roggen whiskey"],
    "scotch": ["scotch whisky", "schottischer whisky"],
    "vodka": ["wodka", "vodka", "wodka-brand"],
    "gin": ["gin", "dry gin", "london dry gin"],
    "tequila": ["tequila", "silberner tequila", "goldener tequila"],
    "cognac": ["cognac", "brandy", "französischer brandy"],
    "triple sec": ["triple sec", "orangenlikör"],
    "cointreau": ["cointreau", "orangenlikör"],
    "grand marnier": ["grand marnier", "orangenlikör"],
    "campari": ["campari", "bitterlikör"],
    "aperol": ["aperol", "bitterlikör"],
    "vermouth": ["wermut", "süßer wermut", "trockener wermut"],
    "amaretto": ["amaretto", "mandellikör"],
    "baileys": ["baileys", "irish cream"],
    "kahlúa": ["kahlúa", "kaffeelikör"],
    "sambuca": ["sambuca", "anislikör"],
    "absinthe": ["absinth", "grüner absinth"],
    "mezcal": ["mezcal", "rauchiger tequila"],
    "limoncello": ["limoncello", "zitronenlikör"],
    "chartreuse": ["chartreuse", "grüner chartreuse", "gelber chartreuse"],
    "grenadine": ["grenadine", "granatapfelsirup"],
    "orgeat syrup": ["mandelsirup", "orgeat"],
    "maraschino liqueur": ["maraschino likör", "kirschlikör"],
    "angostura bitters": ["angostura", "bitter", "cocktail bitter"],
    "simple syrup": ["zuckersirup", "ganz einfacher sirup"],
    "agave syrup": ["agavensirup", "agavendicksaft"],
    "coconut cream": ["kokosnusscreme", "kokossahne"],
    
    // Fruchtsäfte
    "orange juice": ["orangensaft", "o-saft", "orange", "orangen"],
    "pineapple juice": ["ananassaft", "ananas-saft", "ananas"],
    "mango juice": ["mangosaft", "mango-saft", "mango"],
    "passion fruit juice": ["maracujasaft", "passionsfruchtsaft", "maracuja"],
    "lemon juice": ["zitronensaft", "zitrus-saft", "zitrone", "limette"],
    "apple juice": ["apfelsaft", "klarer apfelsaft", "naturtrüber apfelsaft", "apfel"],
    "milk": ["milk", "milch", "h-milch"]
};



// Funktion zum Suchen
export function getIngredient(word) {
    word = word.toLowerCase();
    for (const [ingredient, synonyms] of Object.entries(thesaurus)) {
        if (synonyms.includes(word)) {
            return ingredient;
        }
    }
    // return null falls keine Zutat
    return null;
}

export default thesaurus;
