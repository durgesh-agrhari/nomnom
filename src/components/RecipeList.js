import React from 'react'
import './RecipeList.css'
const RecipeList = ({ recipes, mood }) => {

  let convertToSearch = (string) => {
    let query = '';
    query = string.replace(' ', '%20');
    query = string.replace(',', '%2');
    return query;
  };

  return (
    <div className="RecipeList">
      <div>
          <center><h1 id="recipes">Recipes</h1></center>
          {recipes.map((recipe) => (
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">{recipe.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{'#'+ mood}</h6>
                <p class="card-text">{recipe.description}</p>
                <a href={recipe.original_video_url || recipe.inspired_by_url || `https://tasty.co/search?q=${convertToSearch(recipe.name)}`} target="_blank" class="btn btn-primary">View Recipe</a>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
};

export default RecipeList;