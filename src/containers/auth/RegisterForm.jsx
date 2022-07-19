import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';
import { changeField, initializeForm, register } from '../../modules/auth';
import { check } from '../../modules/user';

const RegisterForm = () => {
    const [error,setError]=useState(null);
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
        if([username,password,passwordConfirm].includes('')){
            setError('빈칸을 모두 입력하세요');
            return;
        }
        if(password!==passwordConfirm){
            setError('비밀번호가 일치하지 않습니다');
            dispatch(changeField({form:'register',key:'password',value:''}));
            dispatch(changeField({form:'register',key:'passwordConfirm',value:''}));
            return;
        }
        dispatch(register({username,password}));
    }

    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    useEffect(()=>{
        if(authError){
            if(authError.response.status===409){
                setError('중복된 ID입니다');
                return;
            }
            setError('회원가입 실패!')
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
            try{
                localStorage.setItem('user',JSON.stringify(user));
            }catch(e){
                console.log('localstorage error');
            }
        }
    },[navigate,user])
    
    return (
        <AuthForm type='register' form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default RegisterForm;