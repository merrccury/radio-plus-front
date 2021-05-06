//import autchReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
//import appReducer from "./app-reducer";

const { createStore, combineReducers, applyMiddleware, compose } = require("redux");

const reducers = combineReducers({
   // auth: autchReducer,
    form: formReducer,
//   app: appReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;
export default store;