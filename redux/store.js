import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import {createWrapper} from "next-redux-wrapper";
import thunk from "redux-thunk";
import masterReducer from "./reducers";

const store = ()=> configureStore({reducer: masterReducer}, {}, applyMiddleware(thunk));

export const wrapper = createWrapper(store);