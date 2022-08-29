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
                user: state.userReducer.user ? state.userReducer.user : action.payload.userReducer.user,
                profile: action.payload.userReducer.profile ? action.payload.userReducer.profile : state.userReducer.profile,
                users: [...new Set(action.payload.userReducer.users, state.userReducer.users)],
                otherUser: action.payload.userReducer.otherUser ? action.payload.userReducer.otherUser : state.userReducer.otherUser,
                isLoading: state.userReducer.isLoading,
                otpStatus: state.userReducer.otpStatus,
                theme: state.userReducer.theme
            },
            blogReducer: {
                blogs: [...new Set(action.payload.blogReducer.blogs, state.blogReducer.blogs)],
                searchedBlogs: [...new Set(action.payload.blogReducer.searchedBlogs, state.blogReducer.searchedBlogs)],
                blog: action.payload.blogReducer.blog ? action.payload.blogReducer.blog : state.blogReducer.blog,
                isLoading: state.blogReducer.isLoading,
            },
            commentReducer: {
                comments: [...new Set(action.payload.commentReducer.comments, state.commentReducer.comments)],
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