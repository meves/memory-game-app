import { UserResultsType } from "../../components/types/types";
import { AppStateType } from "../redux-store";

export const receiveResults = (state: AppStateType): Array<UserResultsType> => state.panel.results;
