import React, { FC, useState } from 'react';
import { UserResultsType } from '../../types/types';
import styles from './Score.module.scss';

type PropsType = {
    results: Array<UserResultsType>
}

const Score: FC<PropsType> = (props) => {
    let place = 1;
    return (
        <div className={styles.score}>
            <h3 className={styles.title}>Top 10 results table</h3>
            <div className={styles.table}>
                <div className={styles.caption}>
                    <div className={styles.place}>Place</div>
                    <div className={styles.name}>User Name</div>
                    <div className={styles.result}>Time</div>  
                </div> 
                <div className={styles.rows}>
                    {props.results && props.results.sort((a: UserResultsType, b: UserResultsType) => {
                        return (a.minutes*60 + a.seconds) - (b.minutes*60 + b.seconds)})
                    .slice(0, 10)
                    .map(result => (
                        <div className={styles.row} key={result.id}>
                            <div className={styles.place}>{place++}</div>
                            <div className={styles.name}>{result.userName}</div>
                            <div className={styles.result}>{result.minutes} m&nbsp;{result.seconds} s</div>
                        </div>
                    ))}
                </div>             
            </div>
        </div>   
    )
}

export default Score;
