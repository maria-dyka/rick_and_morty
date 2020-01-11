import React from 'react';
import styles from './CharacterCard.module.css'

const CharacterCard = props => {
    return (
        <div className={styles.Card}>
            <img 
                className={styles.CardImage} 
                src={props.photo}
                alt={`${props.name}`}/>
            <p className={styles.CardName}>{props.name}</p>
        </div>
    )
};

export default CharacterCard;