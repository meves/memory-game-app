import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { API } from "../api/api";
import { UrlType } from "../api/types";
import { ResultCodes } from "../enums/ResultCodes";
import { copyArray } from "../utils/copyArray";
import { shuffleArray } from "../utils/shuffleArray";
import { AppStateType, InferedActionsType } from "./redux-store";

const initialState = {
    urls: [] as Array<UrlType>
}

type InitialStateType = typeof initialState;

type ActionsTypes = InferedActionsType<typeof actions>;

const gamecardReducer = (state=initialState, action: ActionsTypes) => {
    switch(action.type) {
        case "SET_URLS":
            return {
                ...state,
                urls: action.payload.urls
            }
        default:
            return state;
    }
}

const actions = {
    setUrls: (urls: Array<UrlType>) => ({ type: "SET_URLS", payload: {urls}} as const)
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, Action>;

export const getUrls = (): ThunkType => 
    async (dispatch) => {
        const response = await API.getUrls();
        if (response.status === ResultCodes.SUCCESS) {            
            dispatch(actions.setUrls(shuffleArray(copyArray(response.data))));
        }
    }

export default gamecardReducer;
