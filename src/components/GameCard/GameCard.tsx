import React, { FC, useEffect } from 'react';
import styles from './GameCard.module.scss';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { getUrls, actions, RemoveCardsType } from '../../redux/gamecard-reducer';
import { AppStateType } from '../../redux/redux-store';
import { receiveUrls, receiveCounter } from '../../redux/selectors/gamecard-selector';
import { UrlType } from '../../api/types';

type PropsType = {
    urls: Array<UrlType>
    counter: number
    getUrls: () => void
    removeCards: (url: string) => RemoveCardsType
    setGameOver: (isGameOver: boolean) => void
    setCounter: (counter: number) => void
}


const GameCard: FC<PropsType> = (props) => {
    let timerId: any;
    let cardUrl: string = "";
    let targetCard: any = null;

    const handleCardClick = (url: string, target: any) => {
       if (!timerId) {
           cardUrl = url; 
           targetCard = target; 
           targetCard.classList.add(styles.isClicked);
           timerId = setTimeout(() => {
               clearTimeout(timerId);
               timerId = undefined;
               targetCard.classList.remove(styles.isClicked);
               cardUrl = "";
               targetCard = null;
           }, 5000);
       } else if (timerId) {
           target.classList.add(styles.isClicked);
           if (cardUrl !== url) {
               setTimeout(() => {
                   target.classList.remove(styles.isClicked);    
               }, 500);
           } else {
               props.removeCards(cardUrl);
               clearTimeout(timerId);
               timerId = undefined;
               cardUrl = "";
               target.classList.remove(styles.isClicked);
               targetCard.classList.remove(styles.isClicked);
               targetCard = null;
               if (props.counter < 1) {
                   props.setCounter(props.counter + 1);
                } else if (props.counter === 1) {
                    props.setGameOver(true);
                }
           }
       }
    }
    useEffect(() => {
        props.getUrls();
    },[]);
        
    return (
        <main className={styles.gameCard}>
            { props.urls.map(urlObject => { 
                    return <Card key={urlObject.id} 
                                 url={urlObject.url}
                                 id={urlObject.id}
                                 handleCardClick={handleCardClick}
                            />;
                })
            }
        </main>   
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    urls: receiveUrls(state),
    counter: receiveCounter(state)
})

type MapStatePropsType = {
    urls: Array<UrlType>
    counter: number
}

type MapStateDispatchType = {
    getUrls: () => void
    removeCards: (url: string) => RemoveCardsType
    setGameOver: (isGameOver: boolean) => void
    setCounter: (counter: number) => void
}

const { removeCards, setGameOver, setCounter } = actions;

export default connect<MapStatePropsType, MapStateDispatchType, {}, AppStateType>(
    mapStateToProps, { getUrls, removeCards, setGameOver, setCounter })(GameCard);
