import React, { useEffect, useState, useRef } from 'react';
import '../App.css';



const SearchBar = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
  
    useEffect(() => {
      const pokemon = [];
      const promises = new Array(20)
        .fill()
        .map((value, index) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${index + 1}`));
      Promise.all(promises).then(pokemonArr => {
        return pokemonArr.map(value =>
          value
            .json()
            .then(({ name, sprites: { front_default: sprite } }) =>
              pokemon.push({ name, sprite })
            )
        );
      });
      setOptions(pokemon);
    }, []);
  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    const updatePokeDex = poke => {
      setSearch(poke);
      setDisplay(false);
    };
  
    return (
      <div ref={wrapperRef} className="searchBar">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Search your pokemon here"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {display && (
          <div className="container">
            {options
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, index) => {
                return (
                  <div
                    onClick={() => updatePokeDex(value.name)}
                    className="option"
                    key={index}
                    tabIndex="0"
                  >
                    <p>{value.name}</p>
                    <img style={{height: "40px", width: "40px"}} src={value.sprite} alt="pokemon" />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

export default SearchBar;
  