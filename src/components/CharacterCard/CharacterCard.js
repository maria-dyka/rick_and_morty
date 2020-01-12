import React from 'react';
import styles from './CharacterCard.module.css';
import { Link } from 'react-router-dom';

const CharacterCard = props => {
    return (
        <div className={styles.Card}>
            <img 
                className={styles.CardImage} 
                src={props.photo}
                alt={`${props.name}`}/>

            <Link to={`/details/${props.id}`}>
                <p className={styles.CardName}>{props.name}</p>
            </Link>
        </div>
    )
};

export default CharacterCard;