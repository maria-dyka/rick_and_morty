import React from 'react';
import axios from 'axios';

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character/')
      .then(resp => {
        console.log('characters', resp);
      })
      .catch(err => {
        console.log('get characters error: ', err)
      })
  })
  return (
    <div className="App">
      <div className="ListWrapper">
      </div>    
    </div>
  );
}

export default App;
