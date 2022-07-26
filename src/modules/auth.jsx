import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import createRequestThunk, { createRequestActionTypes } from "../lib/createRequestThunk";
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD='auth/CHANGE_FIELD';
const INITALIZE_FORM='auth/INITALIZE_FORM';
const [REGISTER,REGISTER_SUCCESS,REGISTER_FAILURE]=createRequestActionTypes('auth/REGISTER',);
const [LOGIN,LOGIN_SUCCESS,LOGIN_FAILURE]=createRequestActionTypes('auth/LOGIN',);
// const LOGIN='auth/LOGIN';
// const LOGIN_SUCCESS='auth/LOGIN_SUCCESS';
// const LOGIN_FAILURE='auth/LOGIN_FAILURE';

export const changeField=createAction(CHANGE_FIELD,
    ({form,key,value})=>({
        form,//register,login
        key,//username, password, passwordConfirm
        value,//change value
    }),
);
export const initializeForm=createAction(INITALIZE_FORM,form=>form);
export const login=createRequestThunk(LOGIN,authAPI.login);
export const register=createRequestThunk(REGISTER,authAPI.register);

const initialState={
    register:{
        username:'',
        password:'',
        passwordConfirm:'',
    },
    login:{
        username:'',
        password:'',
    },
    auth:null,
    authError:null,
};

const auth=handleActions(
    {
        [CHANGE_FIELD]:(state,{payload:{form,key,value}})=>
            produce(state,draft=>{
                draft[form][key]=value;
            }),
        [INITALIZE_FORM]:(state,{payload:form})=>({
            ...state,
            [form]:initialState[form],
        }),
        [REGISTER_SUCCESS]:(state,{payload:auth})=>({
            ...state,
            authError:null,
            auth,
        }),
        [REGISTER_FAILURE]:(state,{payload:error})=>({
            ...state,
            authError:error,
        }),
        [LOGIN_SUCCESS]:(state,{payload:auth})=>({
            ...state,
            authError:null,
            auth,
        }),
        [LOGIN_FAILURE]:(state,{payload:error})=>({
            ...state,
            authError:error,
        }),
    },
    initialState,
);

export default auth;
