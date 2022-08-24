import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// *********************************** USER SECTION *********************************** \\

export const register = ({name,email,password})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/register`,{name,email,password});

        if(res.data.success) {
            dispatch({
                type: "register",
                payload: {
                    user: getCookie("jb_user_token")
                }
            });
            toast.success("Registered Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "register",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "register",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const login = ({email,password})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });
    
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/auth/login`,{email,password});

        if(res.data.success) {
            dispatch({
                type: "login",
                payload: {
                    user: getCookie("jb_user_token")
                }
            });
            toast.success("Welcome Back!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "login",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "login",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const profile = (token)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/auth/profile`,{headers: {jb_user_token: token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_user_profile", JSON.stringify(res.data.user));
            }
            dispatch({
                type: "profile",
                payload: {
                    profile: res.data.user
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editProfile = ({name,email,profilepic})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    let dp = null;
    if(profilepic !== "") {
        const data = new FormData();
        data.append("file", profilepic);
        data.append("upload_preset", "coders_hub");
        data.append("cloud_name", "alpha2625");
        const response = await axios.post("https://api.cloudinary.com/v1_1/alpha2625/image/upload", data);
        dp = response.data.secure_url;
    }
    else {
        dp = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
    }

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/editprofile`,{name, email, profilepic: dp});

        if(res.data.success) {
            localStorage.setItem("jb_user_profile", JSON.stringify(res.data.user));
            dispatch({
                type: "edit-profile",
                payload: {
                    profile: res.data.user
                }
            });
            toast.success("Profile Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editOtherProfile = ({id,name,email})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/editotherprofile`,{id,name,email});
        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_users", JSON.stringify(res.data.users));
            }

            dispatch({
                type: "edit-other-profile",
                payload: {
                    users: res.data.users,
                    otherUser: res.data.user
                }
            });
            toast.success(`Profile updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-other-profile",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-other-profile",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const changePassword = ({oldPassword, newPassword, confirmPassword})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/auth/changepassword`, {oldPassword, newPassword, confirmPassword});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_user_profile", JSON.stringify(res.data.user));
            }

            dispatch({
                type: "change-password",
                payload: {
                    profile: res.data.user,
                }
            });
            toast.success(`Password updated successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "change-password",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "change-password",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } 
}

export const deleteUser = ()=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/auth/deleteuser`);
        if(res.data.success) {
            localStorage.removeItem("jb_user_profile");
            localStorage.removeItem("jb_blogs");
            localStorage.removeItem("jb_users");
            dispatch({
                type: "delete-user",
                payload: {
                    error: null
                }
            });
            toast.success(`Account Deleted Successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-user",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-user",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const deleteOtherUser = (id)=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/auth/deleteotheruser?id=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_users", JSON.stringify(res.data.users));
            }

            dispatch({
                type: "delete-other-user",
                payload: {
                    users: res.data.users,
                    error: null
                }
            });
            toast.success(`Account Deleted Successfully!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-other-user",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-other-user",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const getAllUsers = (token)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/auth/`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_users", JSON.stringify(res.data.users));
            }

            dispatch({
                type: "get-all-users",
                payload: {
                    users: res.data.users
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-all-users",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-all-users",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const getUser = ({id, token})=> async (dispatch)=> {
    dispatch({
        type: "user-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/auth/getprofile?id=${id}`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-user",
                payload: {
                    otheruser: res.data.otheruser
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-user",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-user",
            payload: {
              error: error,
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const toggleTheme = ()=> async (dispatch)=> {
    dispatch({
        type: "toggle-theme"
    });
}

export const logout = ()=> async (dispatch)=> {
    deleteCookie("jb_user_token");
    localStorage.removeItem("jb_user_profile");
    localStorage.removeItem("jb_blogs");
    localStorage.removeItem("jb_users");
    dispatch({
        type: "logout"
    });
    toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

// *********************************** BLOG SECTION *********************************** \\

export const getAllBlogs = (token)=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.get(`${url}/api/blogs/`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }

            dispatch({
                type: "get-all-blogs",
                payload: {
                    blogs: res.data.blogs
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-all-blogs",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-all-blogs",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const getBlog = ({id, token})=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.get(`${url}/api/blogs/getblog?id=${id}`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-blog",
                payload: {
                    blog: res.data.blog
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const addBlog = ({title,description,content,category})=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.post(`${url}/api/blogs/addblog`, {title, description, content ,category});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_user_profile", JSON.stringify(res.data.user));
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }

            dispatch({
                type: "add-blog",
                payload: {
                    blogs: res.data.blogs,
                    profile: res.data.user
                }
            });
            toast.success("Blog Added Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "add-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editBlog = ({id,title,description,content,category})=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.put(`${url}/api/blogs/editblog`, {id, title, description, content ,category});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }

            dispatch({
                type: "edit-blog",
                payload: {
                    blogs: res.data.blogs,
                    blog: res.data.blog
                }
            });
            toast.success("Blog Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editOtherBlog = ({id,title,description,content,category})=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.put(`${url}/api/blogs/editotherblog`, {id, title, description, content ,category});

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }
            
            dispatch({
                type: "edit-other-blog",
                payload: {
                    blogs: res.data.blogs,
                    blog: res.data.blog
                }
            });
            toast.success("Blog Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-other-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-other-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const deleteBlog = (id)=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.delete(`${url}/api/blogs/deleteblog?id=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_user_profile", JSON.stringify(res.data.user));
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }

            dispatch({
                type: "delete-blog",
                payload: {
                    blogs: res.data.blogs,
                    profile: res.data.user,
                    blog: null
                }
            });
            toast.success("Blog Deleted Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const deleteOtherBlog = (id)=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.delete(`${url}/api/blogs/deleteotherblog?id=${id}`);

        if(res.data.success) {
            if(typeof window !== "undefined") {
                localStorage.setItem("jb_blogs", JSON.stringify(res.data.blogs));
            }

            dispatch({
                type: "delete-other-blog",
                payload: {
                    blogs: res.data.blogs,
                    otherUser: res.data.user
                }
            });
            toast.success("Blog Deleted Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-other-blog",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-other-blog",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const searchBlogs = ({name, token})=> async (dispatch)=> {
    dispatch({
        type: "blogs-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/blogs/searchblogs?name=${name}`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "search-blogs",
                payload: {
                    searchedBlogs: res.data.searchedBlogs
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "search-blogs",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "search-blogs",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

// *********************************** COMMENT SECTION *********************************** \\

export const getAllComments = ({id, token})=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.get(`${url}/api/comment?id=${id}`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-all-comments",
                payload: {
                    comments: res.data.comments
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-all-comments",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-all-comments",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}


export const getComment = ({id, token})=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";

    try {
        const res = await axios.get(`${url}/api/comment/getcomment?id=${id}`, {headers: {jb_user_token: token}});

        if(res.data.success) {
            dispatch({
                type: "get-comment",
                payload: {
                    comment: res.data.comment
                }
            });
        }

        if(res.data.error) {
            dispatch({
                type: "get-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "get-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const addComment = ({title,comment,blogId})=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.post(`${url}/api/comment/addcomment`, {title, comment, blogId});

        if(res.data.success) {
            dispatch({
                type: "add-comment",
                payload: {
                    comments: res.data.comments
                }
            });
            toast.success("Comment Added Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "add-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "add-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editComment = ({id,title,comment})=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/comment/editcomment`, {id, title, comment});

        if(res.data.success) {
            dispatch({
                type: "edit-comment",
                payload: {
                    comments: res.data.comments,
                    comment: res.data.comment
                }
            });
            toast.success("Comment Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const editOtherComment = ({id,title,comment})=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/comment/editothercomment`, {id, title, comment});

        if(res.data.success) {
            dispatch({
                type: "edit-other-comment",
                payload: {
                    comments: res.data.comments,
                    comment: res.data.comment
                }
            });
            toast.success("Comment Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "edit-other-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "edit-other-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const deleteComment = (id)=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/comment/deletecomment?id=${id}`);

        if(res.data.success) {
            dispatch({
                type: "delete-comment",
                payload: {
                    comments: res.data.comments
                }
            });
            toast.success("Comment Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const deleteOtherComment = (id)=> async (dispatch)=> {
    dispatch({
        type: "comments-loading"
    });

    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.delete(`${url}/api/comment/deleteothercomment?id=${id}`);

        if(res.data.success) {
            dispatch({
                type: "delete-other-comment",
                payload: {
                    comments: res.data.comments
                }
            });
            toast.success("Comment Updated Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "delete-other-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "delete-other-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const likeComment = (id)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/comment/likecomment`,{id});

        if(res.data.success) {
            dispatch({
                type: "like-comment",
                payload: {
                    comments: res.data.comments
                }
            });
            toast.success("Liked Comment Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "like-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "like-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}

export const unlikeComment = (id)=> async (dispatch)=> {
    const url = process.env.NODE_ENV === "production" ? "https://coders-hub-rho.vercel.app" : "http://localhost:3000";
    try {
        const res = await axios.put(`${url}/api/comment/unlikecomment`,{id});

        if(res.data.success) {
            dispatch({
                type: "unlike-comment",
                payload: {
                    comments: res.data.comments
                }
            });
            toast.success("Unliked Comment Successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        if(res.data.error) {
            dispatch({
                type: "unlike-comment",
                payload: {
                    error: res.data.error
                }
            });
            toast.error(res.data.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    } catch (error) {
        dispatch({
            type: "unlike-comment",
            payload: {
                error: error
            }
        });
        toast.error(error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}