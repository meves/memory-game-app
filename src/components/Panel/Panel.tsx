import React from "react";
import Score from "./Score/Score";
import Timer from "./Timer/Timer";
import User from "./User/User";
import styles from './Panel.module.scss';
import { connect } from "react-redux";
import { saveUserResult, getResults } from '../../redux/panel-reducer';
import { AppStateType } from "../../redux/redux-store";
import { receiveResults } from "../../redux/selectors/panel-selectors";
import { UserResultsType } from "../types/types";

type PropsType = {
    results: Array<UserResultsType>
    saveUserResult: (userName: string, seconds: number) => void
    getResults: () => void
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
    saveTime = (seconds: number) => {
        this.props.saveUserResult(this.state.userName, seconds);
    }
    render() {
        return (
            <div className={styles.panel}>
                <User saveUserName={this.saveUserName} userName={this.state.userName}/>
                <Timer saveTime={this.saveTime}/>
                <Score results={this.props.results}/>
            </div>
        )        
    }
}

type MapStatePropsType = {
    results: Array<UserResultsType>
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    results: receiveResults(state)
})

type MapDispatchPropsType = {
    saveUserResult: (userName: string, seconds: number) => void
    getResults: () => void
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(
    mapStateToProps, { saveUserResult, getResults })(Panel);
