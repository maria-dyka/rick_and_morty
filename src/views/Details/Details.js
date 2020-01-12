import React, { useEffect, useState } from 'react';
import styles from './Details.module.css';
import axios from 'axios';

import ListItem from '../../components/DetailsListItem/DetailListItem';

const Details = props => {
    const [character, setCharacter] = useState({});

    useEffect(() =>{
        console.log('[useEffect] called')
        axios.get(`https://rickandmortyapi.com/api/character/${props.match.params.id}`)
            .then(resp => {
                setCharacter(resp.data);
            })
            .catch(err => {
                console.log('get details about character error: ', err)
            })
    }, [])

    return (
        <div className={styles.Wrapper}>
            <h1 className={styles.Name}>{character.name}</h1>
            <div className={styles.DetailsCard}>
                <div className={styles.LeftPart}>
                    <img 
                        src={character.image}
                        alt={character.name}
                        className={styles.Image}/>
                </div>
                <div className={styles.RightPart}>
                    {Object.keys(character).map(key => {
                        if (key === 'image' || key === 'episode' || key === 'url' || key === 'id') return null;

                        return (
                            <ListItem 
                                key={key}
                                keyValue={key}
                                value={character[key]}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Details;