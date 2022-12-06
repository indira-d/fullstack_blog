import {configureStore} from '@reduxjs/toolkit'
import  authSlice  from './features/auth/authSlice';
import postSlice from "./features/post/postSlice";
import commentSlice from "./features/comment/CommentSlice";

export const store = configureStore({
	reducer: {
	    auth: authSlice,
        post: postSlice,
        comment: commentSlice
	},
})