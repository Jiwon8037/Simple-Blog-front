import {  handleActions } from "redux-actions";
import createRequestThunk, { createRequestActionTypes } from "../lib/createRequestThunk";
import * as postsAPI from '../lib/api/posts';

const [LIST_POSTS,LIST_POSTS_SUCCESS,LIST_POSTS_FAILURE]=createRequestActionTypes('posts/LIST_POSTS');
export const listPosts=createRequestThunk(LIST_POSTS,postsAPI.listPosts);

const initialState={
    posts:null,
    error:null,
    lastPage:1,
};

const posts=handleActions(
    {
        [LIST_POSTS_SUCCESS]:(state,{payload:posts, meta:response})=>({
            ...state,
            posts,
            lastPage:parseInt(response.headers['last-page'],10),
        }),
        [LIST_POSTS_FAILURE]:(state,{payload:error})=>({
            ...state,
            error,
        }),
    },
    initialState,
);

export default posts;