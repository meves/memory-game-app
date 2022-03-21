import { UrlType } from "../../api/types";
import { AppStateType } from "../redux-store";

export const receiveUrls = (state: AppStateType): Array<UrlType> => state.gamecard.urls;
