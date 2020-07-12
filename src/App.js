import React from 'react';
import RecipeList from './components/RecipeList';
import './App.css';
import logo from './logo.png';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      mood: '',
    };
    this.getRecipe = this.getRecipe.bind(this);
  }

  // bakesByMood = {
  //   'angry': ['bread', 'cookies', 'savory', 'garlic,onion'],
  //   'happy': ['cake', 'cookies', 'garlic%252Conion', 'savory'],
  //   'bored': [ 'cake', 'cookies' ],
  //   'sad': ['brownies', 'cookies','comfort','holiday'],
  //   'adventurous': [ 'international', 'cake', 'art' ],
  //   'anxious': ['cookies','comfort','pasta','pie']
  // }

  bakesByMood = {
    'angry': ['bread'],
    'happy': ['cake'],
    'bored': ['pie' ],
    'sad': ['cookies'],
    'adventurous': [ 'international' ],
    'anxious': ['pasta']
  }

  getRecipe = async (e) => {
    let mood = e.target.innerHTML;
    let keys = this.bakesByMood[mood];
    let size = 18 / keys.length;

    this.setState({mood: mood});
    let results = [];
    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      let url = `https://tasty.p.rapidapi.com/recipes/list`;
      if(key === 'happy' || key === 'adventurous')
        url += '?tags=';
      else 
        url += '?tags=under_30_minutes';
      
      
      url+= `&q=${key}&from=0&sizes=${size}`
      const api_call = await fetch(url, {
        'Accept'       : 'application/json',
        'Content-Type' : 'application/json',
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "tasty.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_TASTY_API_KEY,
            },
          });
      const response = await api_call.json();
      results = results.concat(response.results);
    };

    this.setState({ recipes: results });

    console.log(this.state.recipes);
  }

  testRecipes = [{ name: 'Name', video_url: 'https://www.google.com'}, { name: 'Name', video_url: 'https://www.google.com'}, { name: 'Name', video_url: 'https://www.google.com'}, { name: 'Name', video_url: 'https://www.google.com'}, { name: 'Name', video_url: 'https://www.google.com'}, { name: 'Name', video_url: 'https://www.google.com'}];

  render() {
    return (
    <div className="container">
      <header>
        <img id="logo" src={logo} alt="nomnom logo"></img>
        <div class="col text-right">
          <a href="https://aditip897.github.io/" target="_blank" class="btn btn-primary map-button">Find sweets near you!</a>
        </div>
        
      </header>
      <center><h1 id="heading">today i'm feeling...</h1></center>

        <div class="row justify-content-md-center">
          <div class='col-sm text-center mood-button' onClick={this.getRecipe}>
            <p id="button-text">happy</p>
          </div>
          <div class='col-sm text-center  mood-button' onClick={this.getRecipe}>
            <p id="button-text">sad</p>
          </div>
          <div class='col-sm text-center  mood-button' onClick={this.getRecipe}>
            <p id="button-text">adventurous</p>
          </div>
        </div>

        <div class="row justify-content-md-center">
          <div class='col-sm  text-center mood-button' onClick={this.getRecipe}>
            <p id="button-text">angry</p>
          </div>
          <div class='col-sm  text-center mood-button' onClick={this.getRecipe}>
            <p id="button-text">bored</p>
          </div>
          <div class='col-sm  text-center mood-button' onClick={this.getRecipe}>
            <p id="button-text">anxious</p>
          </div>
        </div>

      {Object.keys(this.bakesByMood).map((mood) => (
        <div  
          onClick={this.getRecipe} id="mood-button">
        </div>
      ))}
    <RecipeList recipes={this.state.recipes} mood={this.state.mood}></RecipeList>

    <footer>
      <div class="row justify-content-md-center">
        <div class="col text-center">
          <p>Icons made by <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26">Icongeek26</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></p>
          <p>Logo by Free Logo Design</p>
          <p>With ❤️ by Aditi and Archi</p>
        </div>
      </div>
    </footer>
    </div>
    );
  }
}
export default App;
