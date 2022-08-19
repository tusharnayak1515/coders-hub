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
                profile: action.payload.userReducer.profile ? action.payload.userReducer.profile : state.userReducer.profile,
                users: action.payload.userReducer.users ? action.payload.userReducer.users : state.userReducer.users,
                otherUser: action.payload.userReducer.otherUser ? action.payload.userReducer.otherUser : state.userReducer.otherUser,
                isLoading: state.userReducer.isLoading,
            },
            blogReducer: {
                blogs: action.payload.blogReducer.blogs ? action.payload.blogReducer.blogs : state.blogReducer.blogs,
                blog: action.payload.blogReducer.blog ? action.payload.blogReducer.blog : state.blogReducer.blog,
                isLoading: state.blogReducer.isLoading,
            },
            commentReducer: {
                comments: action.payload.commentReducer.comments ? action.payload.commentReducer.comments : state.commentReducer.comments,
                comment: action.payload.commentReducer.comment ? action.payload.commentReducer.comment : state.commentReducer.comment,
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