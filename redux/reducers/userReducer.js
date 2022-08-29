import { getCookie } from "cookies-next";

let isUser = null;
let isProfile = null;
let isUsers = null;
let isOtp = null;

if(!getCookie("jb_user_token")) {
    isUser = null;
}
else {
    isUser = getCookie("jb_user_token");
}

if(typeof window !== "undefined") {
    if(localStorage.getItem("jb_user_profile") === null) {
        isProfile = null;
    }
    else {
        isProfile = JSON.parse(localStorage.getItem("jb_user_profile"));
    }

    if(localStorage.getItem("jb_users") === null) {
        isUsers = null;
    }
    else {
        isUsers = JSON.parse(localStorage.getItem("jb_users"));
    }

    if(localStorage.getItem("jb_otp") === null) {
        isOtp = null;
    }
    else {
        isOtp = JSON.parse(localStorage.getItem("jb_otp"));
    }
}

const initState = {
    user: isUser,
    profile: isProfile,
    users: isUsers,
    otherUser: null,
    theme: "light",
    otp: isOtp,
    isLoading: false
}

const userReducer = (state=initState, action)=> {
    if(action.type === "users-loading") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if(action.type === "toggle-theme") {
        const theme = state.theme === "light" ? "dark" : "light";
        return {
            ...state,
            theme: theme,
            isLoading: false
        }
    }
    else if(action.type === "send-email") {
        const {error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            isLoading: false
        }
    }
    else if(action.type === "submit-otp") {
        const {error, otp} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            otp: otp,
            isLoading: false
        }
    }
    else if(action.type === "reset-password") {
        const {error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            isLoading: false
        }
    }
    else if(action.type === "reset-otp-status") {
        return {
            ...state,
            otp: null,
            isLoading: false
        }
    }
    else if(action.type === "register") {
        const {error,user} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if(action.type === "login") {
        const {error,user} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: user,
            isLoading: false
        }
    }
    else if(action.type === "profile") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "edit-profile") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "edit-other-profile") {
        const {error,users,otherUser} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            users: users,
            otherUser: otherUser,
            isLoading: false
        }
    }
    else if(action.type === "change-password") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "delete-user") {
        const {error} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            user: null,
            profile: null,
            users: null,
            otherUser: null,
            isLoading: false
        }
    }
    else if(action.type === "delete-other-user") {
        const {error,users} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            users: users,
            otherUser: null,
            isLoading: false
        }
    }
    else if(action.type === "get-all-users") {
        const {error,users} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            users: users,
            isLoading: false
        }
    }
    else if(action.type === "get-user") {
        const {error,otheruser} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            otherUser: otheruser,
            isLoading: false
        }
    }
    else if(action.type === "add-blog") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "delete-blog") {
        const {error,profile} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            profile: profile,
            isLoading: false
        }
    }
    else if(action.type === "delete-other-blog") {
        const {error,otherUser} = action.payload;
        if(error) {
            return {
                ...state,
                isLoading: false
            }
        }
        return {
            ...state,
            otherUser: otherUser,
            isLoading: false
        }
    }
    else if(action.type === "logout") {
        return {
            ...state,
            user: null,
            profile: null,
            users: null,
            otherUser: null,
            isLoading: false
        }
    }
    else {
        return state;
    }
}

export default userReducer;