import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { API } from "../api/api";
import { UserResultsType } from "../components/types/types";
import { ResultCodes } from "../enums/ResultCodes";
import { AppStateType, InferedActionsType } from "./redux-store";

const initialSate = {
    results: [] as UserResultsType[]
}

type InitialStateType = typeof initialSate;

type ActionsTypes = InferedActionsType<typeof actions>;

const panelReducer = (state=initialSate, action: ActionsTypes) => {
    switch(action.type) {
        case "SAVE_RESULTS":
            return {
                ...state,
                results: [...action.payload.results]
            }
        default:
            return state;
    }
}

const actions = {
    saveResults: (results: Array<UserResultsType>) => ({
        type: "SAVE_RESULTS", payload: { results }
    } as const)
}


// thunk
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, Action>;

export const saveUserResult = (userName: string, seconds: number): ThunkType => 
    async (dispatch) => {
        const response = await API.postUserResult({userName, seconds});
        if (response.status === ResultCodes.CREATED) {
            dispatch(getResults());
        }
    }

export const getResults = (): ThunkType => 
    async (dispatch) => {
        const response = await API.getResults();
        if (response.status === ResultCodes.SUCCESS) {
            dispatch(actions.saveResults(response.data));
        }
    }

export default panelReducer;
