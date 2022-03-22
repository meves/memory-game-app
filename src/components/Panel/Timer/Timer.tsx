import React, { FC } from 'react';
import styles from './Timer.module.scss';

type PropsType = {
    isGameOver: boolean
    saveTime: (seconds: number) => void 
    setGameOver: (isGameOver: boolean) => void
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
    reset = () => {
        this.setState({timer: new Date(0, 0, 0)});        
        clearInterval(this.timerId);
    }
    startTimer = () => {
        this.timerId = setInterval(() => {
            this.setState({timer: new Date(this.state.timer.setSeconds(this.state.timer.getSeconds()+1))});
        }, 1000);
    }    
    stopTimer = () => {
        this.props.saveTime(this.state.timer.getSeconds() - this.state.startTimer.getSeconds());
        this.reset();
        this.props.setGameOver(false);
    }
    render() {
        return (
            <div className={styles.timer}>
                <time>{this.state.timer.toLocaleTimeString()}</time>
                <button className="btn" onClick={this.startTimer}>Start</button>
            </div>
        )
    }
}

export default Start;
