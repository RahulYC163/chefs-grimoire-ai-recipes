import React from 'react';
import IngredientsList from './IngredientsList';
import Recipe from './Recipe';
import { getRecipeFromMistral } from '../ai';

export default function Main() {
  const [ingredients, setIngredients] = React.useState([]);
  const [recipe, setRecipe] = React.useState('');
  const [alertShown, setAlertShown] = React.useState(false);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newIngredient = formData.get('ingredient');

    if (newIngredient.trim() !== '') {
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
    }
    e.target.reset();
  }

  function handleInputFocus() {
    if (!alertShown) {
      alert('Please enter minimum of 4 ingredients.');
      setAlertShown(true);
    }
  }

  return (
    <main>
      <form onSubmit={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
          onFocus={handleInputFocus}
        />
        <button type="submit">Add ingredient</button>
      </form>

      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <Recipe recipe={recipe} />}
    </main>
  );
}
