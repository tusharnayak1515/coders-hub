import {createWrapper} from "next-redux-wrapper";
import masterReducer from "./reducers";
const { configureStore, applyMiddleware } = require("@reduxjs/toolkit");
const thunk = require("redux-thunk");

const store = ()=> configureStore({reducer: masterReducer}, {}, applyMiddleware(thunk));

export const wrapper = createWrapper(store);