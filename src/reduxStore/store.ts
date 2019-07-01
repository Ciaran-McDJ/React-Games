import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import Reducer, { ReduxState, AnyAction } from "./reducers";
export const store = createStore<ReduxState, AnyAction, unknown, unknown>(
    Reducer,
    applyMiddleware(ReduxThunk),
);
