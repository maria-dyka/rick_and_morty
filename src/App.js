import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

import CharacterCard from './components/CharacterCard';
import Banner from './components/Banner';

function App() {
  const [characters, setCharacters] = useState([]);
  const [searchText, setSearchText] = useState('')
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const onChangeHandler = e => {
    setSearchText(e.target.value)
    const textInput = e.target.value.toLowerCase();
    if (textInput.length === 0) {
      setFilteredCharacters(characters);
    } else {
      setFilteredCharacters(characters.filter(c => c.name.toLowerCase().indexOf(textInput) >= 0));
    }
  }

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(resp => {
        setCharacters(resp.data.results);
        setFilteredCharacters(resp.data.results);
        console.log(resp.data.results)
      })
      .catch(err => {
        console.log('get characters error: ', err);
      })
  }, [])
  return (
    <div className={styles.App}>
      <Banner value={searchText} onChange={onChangeHandler}/>
      <div className={styles.ListWrapper}>
        {filteredCharacters.map(character => 
          <CharacterCard 
            key={character.id}
            name={character.name}
            photo={character.image}
            />)}
      </div>    
    </div>
  );
}

export default App;
