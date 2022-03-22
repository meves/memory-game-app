import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { API } from "../api/api";
import { UrlType } from "../api/types";
import { ResultCodes } from "../enums/ResultCodes";
import { copyArray } from "../utils/copyArray";
import { shuffleArray } from "../utils/shuffleArray";
import { AppStateType, InferedActionsType } from "./redux-store";

const initialState = {
    urls: [] as Array<UrlType>,
    isGameOver: false,
    counter: 1
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
        case "REMOVE_CARDS":
            return {
                ...state,
                urls: state.urls.map((url) => url.url === action.payload.url ? {id: url.id, url: "./icons/oops.png"} : url)
            }
        case "SET_GAME_OVER":
            return {
                ...state,
                isGameOver: action.payload.isGameOver
            }
        case "SET_COUNTER":
            return {
                ...state,
                counter: action.payload.counter
            }
        default:
            return state;
    }
}

export const actions = {
    setUrls: (urls: Array<UrlType>) => ({ type: "SET_URLS", payload: {urls}} as const),
    removeCards: (url: string) => ({
        type: "REMOVE_CARDS", payload: { url }
    } as const),
    setGameOver: (isGameOver: boolean) => ({
        type: "SET_GAME_OVER", payload: {isGameOver}
    } as const),
    setCounter: (counter: number) => ({
        type: "SET_COUNTER", payload: { counter }
    } as const)
}

export type RemoveCardsType = ReturnType<typeof actions.removeCards>;

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, Action>;

export const getUrls = (): ThunkType => 
    async (dispatch) => {
        const response = await API.getUrls();
        if (response.status === ResultCodes.SUCCESS) {            
            dispatch(actions.setUrls(shuffleArray(copyArray(response.data))));
        }
    }

export default gamecardReducer;
