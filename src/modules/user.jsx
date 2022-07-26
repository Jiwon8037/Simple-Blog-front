import { createAction, handleActions } from "redux-actions";
import createRequestThunk, { createRequestActionTypes } from "../lib/createRequestThunk";
import * as authAPI from '../lib/api/auth';

const TEMP_SET_USER='user/TEMP_SET_USER';
const [CHECK,CHECK_SUCCESS,CHECK_FAILURE]=createRequestActionTypes('user/CHECK');
const LOGOUT='user/LOGOUT';

export const tempSetUser=createAction(TEMP_SET_USER,user=>user);
export const check=createRequestThunk(CHECK,authAPI.check);
export const logout=createAction(LOGOUT,authAPI.logout);

const initialState={
    user:null,
    checkError:null,
};

export default handleActions(
    {
        [TEMP_SET_USER]:(state,{payload:user})=>({
            ...state,
            user,
        }),
        [CHECK_SUCCESS]:(state,{payload:user})=>({
            ...state,
            user,
            checkError:null,
        }),
        [CHECK_FAILURE]:(state,{payload:error})=>({
            ...state,
            user:null,
            checkError:error,
        }),
        [LOGOUT]:(state)=>({
            ...state,
            user:null,
        }),
    },
    initialState,
);