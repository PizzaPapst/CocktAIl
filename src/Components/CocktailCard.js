import React from 'react'
import '../Styles/CocktailCard.css';
import { useState, useEffect } from 'react'
import { getCocktailById } from '../Api';

function CocktailCard({id, userIngredients}) {

    const [cocktail, setCocktail] = useState(null);
    const [ingredients, setIngredients] = useState([]); // Neuer State für Zutaten
    
    useEffect(() => {
        getCocktailById(id).then((response) => {
            console.log(response)
            setCocktail(response);
        });
    }, []); // Wird nur ausgeführt, wenn "id" sich ändert
    
    // Wenn cocktail fertig geladen, Zutaten extrahieren
    useEffect(() => {
        if (cocktail) {
            MapIngredients();
        }
    }, [cocktail]); // Nur wenn "cocktail" sich ändert
    
    function MapIngredients() {
        if (!cocktail) return; // Sicherheit gegen null-Werte
    
        const cocktailIngredients = Object.entries(cocktail)
            .filter(([key, value]) => key.includes("strIngredient") && value)
            .map(([_, value]) => value.toLowerCase());
    
        const updatedIngredients = cocktailIngredients.map((item) => ({
            ingredient: item,
            inStock: userIngredients.includes(item)
        }));
    
        console.log("Cocktail Ingredients", cocktailIngredients);
        console.log("Zutat vorhanden?", updatedIngredients);
    
        setIngredients(updatedIngredients); // Zutaten separat speichern
    }
    
    
    

  return (
    // rendern wenn cocktail fertig geladen
    cocktail && <div className='cocktail'>
        <img src={cocktail.strDrinkThumb} className='cocktail-img' />
        <div className='cocktail-info'>
            {cocktail && <h1 className='cocktail-title'>{cocktail.strDrink}</h1>}
            <div className='cocktail-zutaten'>
                <div className='cocktail-zutaten-head'>
                    <p className='label'>Zutaten</p>
                    <p>{ingredients.filter(item => item.inStock).length}/{ingredients.length}</p>
                </div>
                {ingredients.map((item, index) => (
                    <div key={index} className="zutaten-item">
                        <div className="icon-container">
                            {item.inStock ? "✅" : "❌"}
                        </div>
                        <p>{item.ingredient}</p>
                    </div>
                ))}

            </div>
        </div>
    </div>
  )
}

export default CocktailCard
