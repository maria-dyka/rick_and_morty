import React from 'react';
import styles from './Banner.module.css'

const Banner = props => {
    return (
        <div className={styles.Banner}>
            <p className={styles.BannerName}>Search for character</p>
            <input className={styles.BannerInput}/>
        </div>
    )
};

export default Banner;