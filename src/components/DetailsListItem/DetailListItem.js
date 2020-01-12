import React from 'react';
import styles from './DetailsListItem.module.css';

const DetailsListItem = props => {
    if (props.keyValue === 'origin' || props.keyValue === 'location') {
        return (
            <div className={styles.ListItem}>
                <div className={styles.Key}>{props.keyValue}: </div>
                <div className={styles.Value}>{props.value.name}</div>
            </div>
        )
    } else if (props.keyValue === 'created') {
        const creationDate = new Date(props.value);

        return (
            <div className={styles.ListItem}>
                <div className={styles.Key}>{props.keyValue}: </div>
                <div className={styles.Value}>{`${creationDate.toLocaleDateString("en-US")}`}</div>
            </div>
        )
    }

    let value = props.value;
    if (value.length === 0) {
        value = '---'
    }

    return (
        <div className={styles.ListItem}>
            <div className={styles.Key}>{props.keyValue}: </div>
            <div className={styles.Value}>{value}</div>
        </div>
    )
}

export default DetailsListItem;