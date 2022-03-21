import React from 'react';
import styles from './Header.module.scss';

const Header: React.FC = (props) => {
    return (
        <header className={styles.header}>
            <h1>Game Poker Card</h1>
        </header>
    )
}

export default Header;
