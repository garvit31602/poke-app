import React, { useState, useEffect } from 'react';
import './App.css'
import Popup from './Popup'
import Signup from './Signup'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset,setOffset]=useState(0);

//async makes a function return a Promise
//await makes a function wait for a Promise

  useEffect(() => {
    const fetchData = async function Myfunction(){
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=30`);
        const data = await response.json();   
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [offset]);

  const incOffset = () =>{
    setOffset(prevOffset => prevOffset+30)
  }

  const decOffset = () =>{
    if(offset>0)
      setOffset(prevOffset => prevOffset-30)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  return (
    <div className="App">
    <Popup/>
      <div className='top'>
      <div className='heading'>Pokemon Search</div>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + offset + 1
              }.png`}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      <div className='footer'>
      <button className="prev" onClick={decOffset}>Prev</button>
      page no. {offset/30 + 1}
      <button className="next" onClick={incOffset}>Next</button>
      </div>
    </div>
  );
}

export default App;
