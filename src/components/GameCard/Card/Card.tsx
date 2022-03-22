import React, { CSSProperties, FC, MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import styles from '../GameCard.module.scss';

type PropsType = {
    id: number
    url: string
    handleCardClick: (id: number, url: string, isClicked: boolean, target: any) => void 
}

const Card: FC<PropsType> = (props) => {
    let isClicked = false;
       
    const handleClick = (event: MouseEvent) => {
        isClicked = !isClicked;
        props.handleCardClick(props.id, props.url, isClicked, event.currentTarget);                     
    }
    return (
        <div className={styles.card} onClick={handleClick}>
            <img src={props.url} alt="picture" width="70px" />
        </div>
    )
}

export default Card;
