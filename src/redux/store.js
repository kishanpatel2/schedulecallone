import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

// There can be more then 1 middleware.
// The logger middleware console log every action that is dispatched from component
// This is helpful when you want to check the current Redux state and see if actions are
// correctly dispatched from components or not
const middlewares = [thunk, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store