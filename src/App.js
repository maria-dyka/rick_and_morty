import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

import CharacterCard from './components/CharacterCard';
import Banner from './components/Banner';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(resp => {
        setCharacters(resp.data.results);
        console.log(resp.data.results)
      })
      .catch(err => {
        console.log('get characters error: ', err);
      })
  }, [])
  return (
    <div className={styles.App}>
      <Banner/>
      <div className={styles.ListWrapper}>
        {characters.map(character => 
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
