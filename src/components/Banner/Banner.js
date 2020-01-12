import React from 'react';
import styles from './Banner.module.css'

const Banner = props => {
    return (
        <div className={styles.Banner}>
            <p className={styles.BannerName}>Search for character on the page</p>
            <input
                className={styles.BannerInput}
                value={props.value}
                onChange={props.onChange}/>
        </div>
    )
};

export default Banner;