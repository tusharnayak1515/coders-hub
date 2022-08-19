const initState = {
    comments: null,
    isLoading: false
}

const commentReducer = (state=initState, action)=> {
    if(action.type === "comments-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-all-comments") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "add-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "edit-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "edit-other-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "delete-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "delete-other-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "like-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "unlike-comment") {
        const {error,comments} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            comments: comments,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            comments: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default commentReducer;