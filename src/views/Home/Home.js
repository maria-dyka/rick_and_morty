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
    const [sortType, setSortType] = useState('');

    const makeRequest = (url, selected = 1) => {
        axios.get(url)
            .then(resp => {
                setPages({total: resp.data.info.pages, current: selected});
                setCharacters(resp.data.results);
                setFilteredCharacters(resp.data.results);
                setSortType('');
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onChangeHandler = e => {
        setSearchText(e.target.value)
        const textInput = e.target.value.toLowerCase();
        if (textInput.length === 0) {
            makeRequest('https://rickandmortyapi.com/api/character/');
        } else {
            makeRequest(`https://rickandmortyapi.com/api/character/?name=${textInput}`);
        }
    }

    const onRadioChangeHandler = e => {
        setSortType(e.target.value);
        if (e.target.value === 'A-Z') {
            setFilteredCharacters([...characters].sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else {
                    return -1;
                }
            }))
        } else if (e.target.value === 'Z-A') {
            setFilteredCharacters([...characters].sort((a, b) => {
                if (a.name < b.name) {
                    return 1;
                } else {
                    return -1;
                }
            }))
        }
    }

    const onClickHandler = selected => {
        if (searchText.length === 0) {
            makeRequest(`https://rickandmortyapi.com/api/character/?page=${selected}`, selected);
        } else {
            makeRequest(`https://rickandmortyapi.com/api/character/?page=${selected}&name=${searchText}`, selected);
        }
    }

    useEffect(() => {
        axios.get('https://rickandmortyapi.com/api/character/')
        .then(resp => {
            setPages({total: resp.data.info.pages, current: 1});
            setCharacters(resp.data.results);
            setFilteredCharacters(resp.data.results);
        })
        .catch(err => {
            console.log('get characters error: ', err);
        })
    }, [])

    const PagesArray = new Array(pages.total).fill({});

    return (
        <>
            <Banner
                value={searchText}
                onChange={onChangeHandler}
                onRadioChange={onRadioChangeHandler}
                radioValue={sortType}/>
            <nav role="navigation" aria-label="Pagination Navigation" className={styles.PagesWrapper}>
                {PagesArray.map((page, index) => (<a
                        href="#"
                        aria-label={`Goto Page ${index + 1}`}
                        aria-current={index + 1 === pages.current}
                        role="link"
                        key={index}
                        className={[styles.Page, (index + 1 === pages.current) && styles.SelectedPage].join(' ')} 
                        onClick={() => onClickHandler(index + 1)}>{index + 1}</a>))}
            </nav>
            <div className={styles.ListWrapper}>
                {filteredCharacters.map(character => 
                <CharacterCard 
                    key={character.id}
                    id={character.id}
                    name={character.name}
                    photo={character.image}
                    />)}
            </div>
            <nav role="navigation" aria-label="Pagination Navigation" className={styles.PagesWrapper}>
                {PagesArray.map((page, index) => (<a
                        href="#"
                        aria-label={`Goto Page ${index + 1}`}
                        aria-current={index + 1 === pages.current}
                        role="link"
                        key={index}
                        className={[styles.Page, (index + 1 === pages.current) && styles.SelectedPage].join(' ')} 
                        onClick={() => onClickHandler(index + 1)}>{index + 1}</a>))}
            </nav>
        </>
    );
}

export default Home;