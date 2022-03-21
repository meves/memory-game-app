import React, { FC, useState } from 'react';
import styles from './Timer.module.scss';

type PropsType = {
    saveTime: (seconds: number) => void 
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
    }
    render() {
        return (
            <div className={styles.timer}>
                <time>{this.state.timer.toLocaleTimeString()}</time>
                <button onClick={this.startTimer}>Start</button>
                <button onClick={this.stopTimer}>Stop</button>
            </div>
        )
    }
}

export default Start;
