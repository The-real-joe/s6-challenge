import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';
import Char from './char';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ✅ Create state to hold the data from the API
  const [data, setData] = useState([]);

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
          let item2 = data2.find(item => item.name === item1.homeworld);
          return item1 ? { ...item1, ...item2 } : item2;
        });
        combinedData = [...data1, ...data2.map(item => ({ ...item, aliasName: item.name }))];
        setData(combinedData)
        })
      
      .catch(function (error) {
        console.error(error);
      })
  }, []);

  return (
    // ✅ Pass the data into the Character component
    <div className="App">
      { data.map((character, index) => (
        <Char name = {data[index].name} homeworld = {data[index].homeworld} Character key={index} character={character} />
      ))}
    </div>
  );
}

export default App;

// ✅ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
