import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Character from './Character'


const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {
  // ❗ Create state to hold the data from the API
  const [people, setPeople] = useState(people);
  const [planets, setPlanets] = useState(planets)
  // ❗ Create effects to fetch the data and put it in state
  useEffect(()=>{
Promise.all([
  fetch(urlPlanets),
  fetch(urlPeople)
]).then(function(responses){
  return Promise.all(responses.map(function(response){
    return response.json()
  }))
})
.then(function(data){
  const planets = data[0];
  const people = data[1]
})
.catch(function(error){
  console.error(error)
})
  }, [])
  return (
    <div>
      <h2>Star Wars Characters</h2>;
      <p>See the README of the project for instructions on completing this challenge</p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      
    </div>
  )
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
