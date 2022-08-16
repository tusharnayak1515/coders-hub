import blogReducer from "./blogReducer";
import commentReducer from "./commentReducer";
import userReducer from "./userReducer";

const { HYDRATE } = require("next-redux-wrapper");
const { combineReducers } = require("redux");

const rootReducer = combineReducers({
    userReducer: userReducer,
    blogReducer: blogReducer,
    commentReducer: commentReducer,
})

const masterReducer = (state,action)=> {
    if(action.type === HYDRATE) {
        const nextState = {
            ...state,
            userReducer: {
                user: state.userReducer.user,
                profile: action.payload.default.userReducer.profile ? action.payload.default.userReducer.profile : state.userReducer.profile,
                users: action.payload.default.userReducer.users ? action.payload.default.userReducer.users : state.userReducer.users,
                otherUser: action.payload.default.userReducer.otherUser ? action.payload.default.userReducer.otherUser : state.userReducer.otherUser,
                isLoading: state.userReducer.isLoading,
            },
            blogReducer: {
                blogs: action.payload.default.blogReducer.blogs ? action.payload.default.blogReducer.blogs : state.blogReducer.blogs,
                blog: action.payload.default.blogReducer.blog ? action.payload.default.blogReducer.blog : state.blogReducer.blog,
                isLoading: state.blogReducer.isLoading,
            },
            commentReducer: {
                comments: action.payload.default.commentReducer.comments ? action.payload.default.commentReducer.comments : state.commentReducer.comments,
                isLoading: state.commentReducer.isLoading,
            },
        }
        return nextState;
    }
    else {
        return rootReducer(state,action);
    }
}

export default masterReducer;