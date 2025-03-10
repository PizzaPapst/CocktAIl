import FileUpload from './Components/FileUpload';
import './Styles/App.css';
import { useState, useEffect } from 'react';

function App() {

  const [picture, setPicture] = useState(null);

// Bild Analysieren
async function analyzeImage(file) {
  const apiKey = "AIzaSyB6nO6n89XzqbSPJzjts94SWoCT0tmt47s";
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
  //console.log(result);
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

// Funktion zur Bildanalyse starten, wenn das Bild geändert wird
useEffect(() => {
  // Falls picture null ist, nichts tun
  if (!picture) return;

  async function main() {
    const description = await analyzeImage(picture);
    console.log(description); // Ergebnisse der Analyse
  }

  main();
}, [picture]); // useEffect wird jedes Mal ausgeführt, wenn sich picture ändert



async function fetchCocktails() {
  const ingredient = "cranberry juice"; // Statische Zutat
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Gefundene Cocktails:", data.drinks); // Ausgabe in der Konsole
  } catch (error) {
      console.error("Fehler beim Abrufen der Cocktails:", error);
  }
}

async function fetchCocktailDetails(cocktailId) {
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
  
  return (
    <div className="App">
      <h1>Cocktails finden</h1>
      <FileUpload onUpload={onUpload}/>
    </div>
  );
}

export default App;
