import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import gamecardReducer from "./gamecard-reducer";
import panelReducer from "./panel-reducer";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    form: formReducer,
    gamecard: gamecardReducer,
    panel: panelReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppStateType = ReturnType<typeof store.getState>;

export type InferedActionsType<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never;

export default store;
//@ts-ignore
window.store = store;