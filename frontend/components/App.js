import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ✅ Create state to hold the data from the API
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);

  // ✅ Create effects to fetch the data and put it in state
  useEffect(() => {
    Promise.all([
      fetch(urlPlanets),
      fetch(urlPeople)
    ]).then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.json();
      }))
    })
      .then(function (data) {
        const planets = data[0];
        const people = data[1];
        const data1 = people;
        const data2 = planets;
        let combinedData = data1.map(item1 => {
          let item2 = data2.find(item => item.id === item1.id);
          return item2 ? { ...item1, ...item2 } : item1;
        });
        combinedData.forEach(item => {
          // Create a new div element for the card
          let card = document.createElement('div');
          card.classList.add('card');
        
          // Create elements for the name and planet
          let name = document.createElement('p');
          name.textContent = `${item.name}`;
          let planet = document.createElement('p');
          planet.textContent = `${item.homeworld}`;
        
          // Add the name and age to the card
          card.appendChild(name);
          card.appendChild(planet);
        
          // Add the card to the body of the document
          document.body.appendChild(card);
        });
      })
      .catch(function (error) {
        console.error(error);
      })
  }, []);

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ✅ Map over the data in state, rendering a Character at each iteration */}
    </div>
  )
}

export default App;

// ✅ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
