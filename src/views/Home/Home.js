import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

import Banner from '../../components/Banner/Banner';
import CharacterCard from '../../components/CharacterCard/CharacterCard';

const Home = () => {
    const [characters, setCharacters] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const [pages, setPages] = useState({total: 1, current:1});

    const onChangeHandler = e => {
        setSearchText(e.target.value)
        const textInput = e.target.value.toLowerCase();
        if (textInput.length === 0) {
        setFilteredCharacters(characters);
        } else {
        setFilteredCharacters(characters.filter(c => c.name.toLowerCase().indexOf(textInput) >= 0));
        }
    }

    const onClickHandler = selected => {
        axios.get(`https://rickandmortyapi.com/api/character/?page=${selected}`)
        .then(resp => {
            setPages({total: resp.data.info.pages, current: selected});
            setCharacters(resp.data.results);
            setFilteredCharacters(resp.data.results);
            console.log(resp.data.results)
        })
        .catch(err => {
            console.log('get characters error: ', err);
        })
    }

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character/')
        .then(resp => {
            setPages({total: resp.data.info.pages, current: 1});
            setCharacters(resp.data.results);
            setFilteredCharacters(resp.data.results);
            console.log(resp.data.results)
        })
        .catch(err => {
            console.log('get characters error: ', err);
        })
    }, [])

    const PagesArray = new Array(pages.total).fill({});

    return (
        <>
            <Banner value={searchText} onChange={onChangeHandler}/>
            <div className={styles.PagesWrapper}>
                {PagesArray.map((page, index) => {
                    if (index + 1 === pages.current) {
                        return (
                        <span
                            key={index}
                            className={styles.SelectedPage}
                            onClick={() => onClickHandler(index + 1)}>{index + 1}</span>
                        )
                    }
                return <span
                        key={index}
                        className={styles.Page} 
                        onClick={() => onClickHandler(index + 1)}>{index + 1}</span>
                })}
            </div>
            <div className={styles.ListWrapper}>
                {filteredCharacters.map(character => 
                <CharacterCard 
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    photo={character.image}
                    />)}
            </div>
            <div className={styles.PagesWrapper}>
                {PagesArray.map((page, index) => {
                    if (index + 1 === pages.current) {
                        return (
                        <span
                            key={index}
                            className={styles.SelectedPage}
                            onClick={() => onClickHandler(index + 1)}>{index + 1}</span>
                        )
                    }
                return <span
                        key={index}
                        className={styles.Page} 
                        onClick={() => onClickHandler(index + 1)}>{index + 1}</span>
                })}
            </div>
        </>
    );
}

export default Home;