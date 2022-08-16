let isBlogs = null;

if(typeof window !== "undefined") {
    if(localStorage.getItem("jb_blogs") === null) {
        isBlogs = null;
    }
    else {
        isBlogs = JSON.parse(localStorage.getItem("jb_blogs"));
    }
}

const initState = {
    blogs: isBlogs,
    blog: null,
    isLoading: false
}

const blogReducer = (state=initState, action)=> {
    if(action.type === "blogs-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "get-all-blogs") {
        const {error,blogs} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            isLoading: false
        }
    }
    else if(action.type === "get-blog") {
        const {error,blog} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blog: blog,
            isLoading: false
        }
    }
    else if(action.type === "add-blog") {
        const {error,blogs} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            isLoading: false
        }
    }
    else if(action.type === "edit-blog") {
        const {error,blogs,blog} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            blog: blog,
            isLoading: false
        }
    }
    else if(action.type === "edit-other-blog") {
        const {error,blogs,blog} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            blog: blog,
            isLoading: false
        }
    }
    else if(action.type === "delete-blog") {
        const {error,blogs} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            blog: null,
            isLoading: false
        }
    }
    else if(action.type === "delete-other-blog") {
        const {error,blogs} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            blogs: blogs,
            blog: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default blogReducer;