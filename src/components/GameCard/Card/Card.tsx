import React, { FC, MouseEvent } from 'react';
import styles from '../GameCard.module.scss';

type PropsType = {
    url: string
    changeCurrentUrl: (currentUrl: string) => void 
}

const Card: FC<PropsType> = (props) => {

    const makeVisible = (event: MouseEvent) => {
        event.currentTarget.classList.add(styles.isClicked);
        props.changeCurrentUrl(props.url);
        setTimeout(() => {
            
        }, 5000);
    }
    return (
        <div className={styles.card} onClick={makeVisible}>
            <img src={props.url} alt="picture" width="70px" />
        </div>
    )
}

export default Card;
