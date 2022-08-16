import {createWrapper} from "next-redux-wrapper";
const { configureStore, applyMiddleware } = require("@reduxjs/toolkit");
const thunk = require("redux-thunk");
const masterReducer = require("./reducers/index");

const store = configureStore({reducer: masterReducer,middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['profile','edit-profile','get-notes','get-note','edit-note']
        },
    })}, {}, applyMiddleware(thunk));

export const wrapper = createWrapper(store);