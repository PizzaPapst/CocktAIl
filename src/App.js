import FileUpload from './Components/FileUpload';
import './Styles/App.css';
import { useState, useEffect } from 'react';
import { getIngredient } from './Thesaurus.js';
import { object } from './Testobject.js';
import { findCocktails } from './findCocktails.js';

function App() {

  const [picture, setPicture] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [cocktails, setCocktails] = useState(null);
  

// Bild Analysieren
async function analyzeImage(file) {
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  // Bild als Base64 konvertieren
  const base64Image = await toBase64(file);

  const requestBody = {
      requests: [
          {
              image: { content: base64Image },
              "features": [
                  { "type": "TEXT_DETECTION" },
              ],
          },
      ],
  };

  // API-Anfrage senden
  const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
  });

  const result = await response.json();
  console.log(result.responses[0].textAnnotations);
  return result.responses[0].textAnnotations; // Beschreibungen des Bildes
}

// Hilfsfunktion: Datei in Base64 umwandeln
function toBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
  });
}

// Übergeben an FileUpload, um nach Upload Bildanalyse zu starten
function onUpload(file){
  if (file) {
    // Warten bis Bild Analysiert ist
    console.log("Bild aktualisiert")
    setPicture(file)
  }
}

// Bild Analysieren wenn ein neues Bild hochgeladen wird und Zutaten herausfiltern
useEffect(() => {
  // Falls picture null ist, nichts tun
  if (!picture) return;
      
  analyzeImage(picture)
  .then((description) => {
    const ingredientsSet = new Set();
    description.forEach(element => {
      const ingredient = getIngredient(element.description);
      if (ingredient) {
        ingredientsSet.add(ingredient);
      }
    });

    const ingredientsArray = Array.from(ingredientsSet);
    setIngredients(ingredientsArray);
  })  
}, [picture]);

// Wenn Zutaten sich ändern dazugehörige cocktails suchen
useEffect(()=>{
  if (!ingredients) return;

  console.log(ingredients)
  findCocktails(ingredients)
  .then((cocktailResponse) => {
    const cocktailsSorted = []
    // Schlüssel des Objektes absteigend sortieren. Mit dem Cocktail, welcher die meisten Zutaten abdeckt starten 
    const array = Object.keys(cocktailResponse)
      .map(Number)
      .sort((a, b) => b - a);
    
    array.forEach((element)=>{
      cocktailsSorted.push(cocktailResponse[element])
    }) 

    setCocktails(cocktailsSorted.flat())
      
  });
},[ingredients])

// useEffect wird jedes Mal ausgeführt, wenn sich picture ändert

// useEffect(() => {
//   async function main() {
    
//     const description = object;
//     const ingredientsSet = new Set(); // Set speichert nur einzigartige Werte

//     description.forEach(element => {
//       const ingredient = getIngredient(element.description);
//       if (ingredient) {
//         ingredientsSet.add(ingredient); // Automatisch keine Duplikate
//       }
//     });
    
//     const ingredients = Array.from(ingredientsSet); // Set zurück in Array umwandeln
//     console.log(ingredients);

//     const cocktails = await findCocktails(ingredients)
//     console.log(cocktails)
//   }

//   main();
// }, []);
  
  return (
    <div className="App">
      <h1>Cocktails finden</h1>
      <FileUpload onUpload={onUpload}/>
      {cocktails && <div>Cocktails geladen</div>}
    </div>
  );
}

export default App;
