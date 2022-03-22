import React, { FC } from 'react';
import styles from './Timer.module.scss';

type PropsType = {
    isGameOver: boolean
    saveTime: (minutes: number, seconds: number) => void 
    setGameOver: (isGameOver: boolean) => void
    getUrls: () => void
}

type StateType = {
    startTimer: Date
    timer: Date
}

class Start extends React.Component<PropsType, StateType> {
    timerId: NodeJS.Timer = setTimeout(() => {});
    constructor(props: PropsType) {
        super(props);
        this.state = {
            startTimer: new Date(0,0,0),
            timer: new Date(0,0,0),
        }
    }   
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.isGameOver !== this.props.isGameOver && this.props.isGameOver) {
            this.stopTimer()
        }
    }     
    startTimer = () => {
        this.timerId = setInterval(() => {
            this.setState({timer: new Date(this.state.timer.setSeconds(this.state.timer.getSeconds()+1))});
        }, 1000);
    }    
    stopTimer = () => {
        let minutes = this.state.timer.getMinutes() - this.state.startTimer.getMinutes();
        let secondes = this.state.timer.getSeconds() - this.state.startTimer.getSeconds();
        this.props.saveTime(minutes, secondes);
        clearInterval(this.timerId);
    }
    resetGame = () => {
        this.props.setGameOver(false);
        this.props.getUrls();   
        this.setState({startTimer:  new Date(0,0,0)});
        this.setState({timer: new Date(0,0,0)});
    }
    render() {
        return (
            <>
            {this.props.isGameOver && 
               <div className="gameOver" onClick={this.resetGame}>
                The Game is Over
               </div>}
            <div className={styles.timer}>
                <time>{this.state.timer.toLocaleTimeString()}</time>
                <button className="btn" onClick={this.startTimer}>Start</button>
            </div>
            </>
        )
    }
}

export default Start;
