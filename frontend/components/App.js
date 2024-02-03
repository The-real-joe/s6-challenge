import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ✅ Create state to hold the data from the API
  const [data, setData] = useState();

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
          let item2 = data2.find(item => item.id === item1.homeworld);
          return item2 ? { ...item1, ...item2 } : item1;
        });
        setData(combinedData)
        })
      
      .catch(function (error) {
        console.error(error);
      })
  }, []);

  return (
    <div className="App">
      {data.map((character, index) => (
        <Character key={index} character={character} />
      ))}
    </div>
  );
}

export default App;

// ✅ DO NOT CHANGE THE CODE BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
