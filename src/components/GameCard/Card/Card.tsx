import React, { CSSProperties, FC, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import styles from '../GameCard.module.scss';

type PropsType = {
    id: number
    url: string
    handleCardClick: (url: string, target: any) => void 
}

const Card: FC<PropsType> = (props) => {
       
    const handleClick = (event: MouseEvent) => {
        props.handleCardClick(props.url, event.currentTarget);                     
    }
    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={props.url} alt="picture" width="70px" />
        </div>
    )
}

export default Card;
