const API_URL = 'https://api.spoonacular.com/recipes/random';
const API_KEY = 'efa0676407d944d192bf638f0d36a75a'; // API key


document.getElementById('breakfastBtn').addEventListener('click', () => {
  getRandomRecipe('breakfast');
});
document.getElementById('lunchBtn').addEventListener('click', () => {
  getRandomRecipe('lunch');
});
document.getElementById('dinnerBtn').addEventListener('click', () => {
  getRandomRecipe('dinner');
});
document.getElementById('sideDishBtn').addEventListener('click', () => {
  getRandomRecipe('side dish');
});
document.getElementById('dessertBtn').addEventListener('click', () => {
  getRandomRecipe('dessert');
});
document.getElementById('snackBtn').addEventListener('click', () => {
  getRandomRecipe('snack');
});

document.getElementById('surpriseBtn').addEventListener('click', () => {
  getRandomRecipe();
});

// fetch a random recipe
async function getRandomRecipe(category = '') {
  const recipeDetails = document.getElementById('recipeDetails');
  


  try {
    // Build the URL with category filter if provided
    const url = `${API_URL}?apiKey=${API_KEY}${category ? `&tags=${category}` : ''}`;
    
    // Make the API request to Spoonacular
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.recipes && data.recipes.length > 0) {
      displayRecipe(data.recipes[0]);
    } else {
      throw new Error('No recipes found.');
    }

  } catch (error) {
    console.error('Error fetching recipe:', error);
    recipeDetails.innerHTML = `
      <p class="text-center text-red-500">Sorry, we couldn't fetch the recipe. Please try again later.</p>
    `;
  }
}

// Function to display the recipe details
function displayRecipe(recipe) {
  const recipeDetails = document.getElementById('recipeDetails');
  recipeDetails.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${recipe.title}</h2>
    <p class="text-gray-600 mb-2">Category: ${recipe.dishTypes?.join(', ') || 'N/A'}</p>
    <h3 class="text-lg font-semibold mb-2">Ingredients:</h3>
    <ul class="list-disc pl-5 mb-4">
      ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
    </ul>
    <h3 class="text-lg font-semibold mb-2">Instructions:</h3>
    <p>${recipe.instructions || 'No instructions available.'}</p>
  `;
}

async function getRandomRecipe(category = '') {
    const recipeDetails = document.getElementById('recipeDetails');
    const spinner = document.getElementById('loadingSpinner');
  
    // Show spinner and hide recipe details
    spinner.classList.remove('hidden');
    recipeDetails.innerHTML = '';
  
    try {
      const url = `${API_URL}?apiKey=${API_KEY}${category ? `&tags=${category}` : ''}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.recipes && data.recipes.length > 0) {
        displayRecipe(data.recipes[0]);
      } else {
        throw new Error('No recipes found.');
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
      recipeDetails.innerHTML = `
        <p class="text-center text-red-500">Sorry, we couldn't fetch the recipe. Please try again later.</p>
      `;
    } finally {
      spinner.classList.add('hidden');
    }
  }
  