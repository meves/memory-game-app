import React, { FC, useEffect, useState } from 'react';
import styles from './GameCard.module.scss';
import Card from './Card/Card';
import { connect } from 'react-redux';
import { getUrls } from '../../redux/gamecard-reducer';
import { AppStateType } from '../../redux/redux-store';
import { receiveUrls } from '../../redux/selectors/gamecard-selector';
import { UrlType } from '../../api/types';

type PropsType = {
    urls: Array<UrlType>
    getUrls: () => void
}

const GameCard: FC<PropsType> = (props) => {
    const [currentURL, setCurrentURL] = useState("");

    const changeCurrentUrl = (currentUrl: string) => {
        setCurrentURL(currentUrl);
    }

    useEffect(() => {
        props.getUrls();
    },[]);
        
    return (
        <main className={styles.gameCard}>
            { props.urls.map(urlObject => { 
                    return <Card key={urlObject.id} url={urlObject.url}
                                 changeCurrentUrl={changeCurrentUrl}/>;
                })
            }
        </main>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    urls: receiveUrls(state)
})

type MapStatePropsType = {
    urls: Array<UrlType>
}

type MapStateDispatchType = {
    getUrls: () => void
}

export default connect<MapStatePropsType, MapStateDispatchType, {}, AppStateType>(mapStateToProps, { getUrls })(GameCard);
