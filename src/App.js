import FileUpload from './Components/FileUpload';
import './Styles/App.css';
import { useState, useEffect } from 'react';
import { getIngredient } from './Thesaurus.js';
import { object } from './Testobject.js';
import { findCocktails } from './findCocktails.js';
import CocktailCard from './Components/CocktailCard.js';
import PillRemoveable from './Components/PillRemoveable.js';

function App() {

  const [picture, setPicture] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [cocktails, setCocktails] = useState(null);
  const [cocktailIndex, setCocktailIndex] = useState(0);
  

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

    console.log(cocktailsSorted.flat())
    setCocktails(cocktailsSorted.flat())
    setCocktailIndex(0)
      
  });
},[ingredients])

const removeIngredient = (indexToRemove) => {
  setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
};
  
  return (
    <div className="App">
      {!cocktails && <h1>Cocktails finden</h1>}
      {!cocktails && <FileUpload onUpload={onUpload}/>}
      {cocktails && <p className='label'>Zutaten</p>}
      {cocktails && 
        <div className='ingredients-list'>
            {ingredients.map((item, index) => (
              <PillRemoveable
                key={index}
                text={item}
                onRemove={() => removeIngredient(index)}
              />
      ))}
        </div>
      }
      
      {cocktails && <CocktailCard key={cocktailIndex} id={cocktails[cocktailIndex]} userIngredients={ingredients} />}
      {cocktails && <button onClick={()=>{
        if(cocktailIndex === 0){
          setCocktailIndex(cocktails.length-1)
          console.log(cocktailIndex)
        }else{
          setCocktailIndex((prev)=>prev-1)
          console.log(cocktailIndex)

        }
      }}>Prev</button>}
      
      {cocktails && <button onClick={()=>{
        if(cocktailIndex === cocktails.length){
          setCocktailIndex(0)
          console.log(cocktailIndex)
        }else{
          setCocktailIndex((prev)=>prev+1)
          console.log(cocktailIndex)

        }
      }}>Next</button>}
    </div>
  );
}

export default App;
