import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterForm = () => {
    const dispatch=useDispatch();
    const {form,auth,authError,user}=useSelector(({auth,user})=>({
        form:auth.register,
        auth:auth.auth,
        authError:auth.authError,
        user:user.user
    }));

    const onChange=e=>{
        const {value,name}=e.target;
        dispatch(
            changeField({
                form:'register',
                key:name,
                value
            })
        );
    };

    const onSubmit=e=>{
        e.preventDefault();
        const {username,password,passwordConfirm}=form;
        if(password!==passwordConfirm){
            return;
        }
        dispatch(register({username,password}));
    }

    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            console.log(authError);
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
            console.log(user);
            navigate('/');
        }
    },[user])
    
    return (
        <AuthForm type='register' form={form} onChange={onChange} onSubmit={onSubmit}/>
    );
};

export default RegisterForm;