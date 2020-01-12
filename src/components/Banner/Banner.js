import React from 'react';
import styles from './Banner.module.css'

const Banner = props => {
    return (
        <div className={styles.Banner}>
            <p className={styles.BannerName}>Search for character</p>
            <input
                className={styles.BannerInput}
                value={props.value}
                onChange={props.onChange}/>
            <p className={styles.BannerSortTitle}>Sort characters on the page by: </p>
            <div className={styles.BannerSort}>
                <input 
                    id="Az" 
                    type="radio"
                    value='A-Z'
                    checked={props.radioValue === 'A-Z'}
                    onChange={props.onRadioChange}/>
                <label htmlFor="Az" className={styles.BannerLabel}>A-Z</label>
                <input 
                    id="Za" 
                    type="radio"
                    value='Z-A'
                    checked={props.radioValue === 'Z-A'}
                    onChange={props.onRadioChange}/>
                <label htmlFor="Za" className={styles.BannerLabel}>Z-A</label>
            </div>
        </div>
    )
};

export default Banner;