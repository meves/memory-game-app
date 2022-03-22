import React from "react";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import User from "./User/User";
import styles from './Panel.module.scss';
import { connect } from "react-redux";
import { saveUserResult, getResults } from '../../redux/panel-reducer';
import { AppStateType } from "../../redux/redux-store";
import { receiveResults } from "../../redux/selectors/panel-selectors";
import { receiveIsGameOver } from '../../redux/selectors/gamecard-selector';
import { UserResultsType } from "../types/types";
import { actions, getUrls } from '../../redux/gamecard-reducer';

type PropsType = {
    results: Array<UserResultsType>
    isGameOver: boolean
    saveUserResult: (userName: string,  minutes: number, seconds: number) => void
    getResults: () => void
    setGameOver: (isGameOver: boolean) => void
    getUrls: () => void
}

type StateType = {
    userName: string
}

class Panel extends React.Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);
        this.state = {
            userName: ""
        }
    }
    componentDidMount() {
        this.props.getResults();
    }
    saveUserName = (userName: string) => {
        this.setState({ userName });
    }
    saveTime = (minutes: number, seconds: number) => {
        this.props.saveUserResult(this.state.userName, minutes, seconds);
    }
    render() {
        return (
            <div className={styles.panel}>
                <User saveUserName={this.saveUserName} userName={this.state.userName}/>
                <Timer saveTime={this.saveTime} 
                       isGameOver={this.props.isGameOver} 
                       setGameOver={this.props.setGameOver}
                       getUrls={this.props.getUrls}
                       />
                <Score results={this.props.results}/>
            </div>
        )        
    }
}

type MapStatePropsType = {
    results: Array<UserResultsType>
    isGameOver: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    results: receiveResults(state),
    isGameOver: receiveIsGameOver(state)
})

const { setGameOver } = actions;

type MapDispatchPropsType = {
    saveUserResult: (userName: string, minutes: number, seconds: number) => void
    getResults: () => void
    setGameOver: (isGameOver: boolean) => void
    getUrls: () => void
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, { saveUserResult, getResults, setGameOver, getUrls })(Panel);
