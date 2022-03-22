import { UrlType } from "../../api/types";
import { AppStateType } from "../redux-store";

export const receiveUrls = (state: AppStateType): Array<UrlType> => state.gamecard.urls;
export const receiveIsGameOver = (state: AppStateType): boolean => state.gamecard.isGameOver;
export const receiveCounter = (state: AppStateType): number => state.gamecard.counter;
