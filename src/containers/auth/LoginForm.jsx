import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, login } from '../../modules/auth';
import {check} from '../../modules/user';

const LoginForm = () => {
    const [error,setError]=useState(null);
    const dispatch=useDispatch();
    const {form,auth,authError,user}=useSelector(({auth,user})=>({
        form:auth.login,
        authError:auth.authError,
        auth:auth.auth,
        user:user.user,
    }));

    const onChange=e=>{
        const {value,name}=e.target;
        dispatch(
            changeField({
                form:'login',
                key:name,
                value
            })
        );
    };

    const onSubmit=e=>{
        e.preventDefault();
        const {username,password}=form;
        dispatch(login({username,password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('login'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            console.log(authError);
            setError('로그인 실패');
            return;
        }
        if(auth){
            console.log(auth);
            dispatch(check());
        }
    },[auth,authError,dispatch]);

    const navigate=useNavigate();

    useEffect(()=>{
        if(user){
            navigate('/');
        }
    });

    return (
        <AuthForm type='login' form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default LoginForm;