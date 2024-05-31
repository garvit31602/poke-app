import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [offset,setOffset]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
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

  const changeOffset = () =>{
    setOffset(prevOffset => prevOffset+30)
    console.log(offset)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm)
  );

  return (
    <div className="App">
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
      <button className="next" onClick={changeOffset}>Next</button>
    </div>
  );
}

export default App;
