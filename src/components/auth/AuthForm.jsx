import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Button from '../common/Button';

const StyledAuthForm=styled.div`
    h3{
        margin: 0;
        color:${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;
const StyledInput=styled.input`
    font-size:1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus{
        color:$oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }
    &+&{
        margin-top: 1rem;
    }
`;
const StyledFooter=styled.div`
    margin-top: 2rem;
    text-align: right;
    a{
        color:${palette.gray[6]};
        text-decoration: underline;
        &:hover{
            color:${palette.gray[9]};
        }
    }
`;
const StyledButtonWithMarginTop=styled(Button)`
    margin-top: 1rem;
`;

const textMap={
    login:'로그인',
    register:'회원가입'
};

const AuthForm = ({type,form,onChange,onSubmit}) => {
    const text=textMap[type];

    return (
        <StyledAuthForm>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <StyledInput autoComplete='username' name='username' placeholder='ID' onChange={onChange} value={form.username}/>
                <StyledInput autoComplete='password' name='password' placeholder='PW' type='password' onChange={onChange} value={form.password}/>
                {type==='register'&&(
                    <StyledInput autoComplete='new-password' name='passwordConfirm' placeholder='PW Check' type='password' onChange={onChange} value={form.passwordConfirm}/>
                )}
                <StyledButtonWithMarginTop cyan fullWidth>{text}</StyledButtonWithMarginTop>
            </form>
            <StyledFooter>
                {type==='login'?(
                    <Link to='/register'>회원가입</Link>
                ) : (
                    <Link to='/login'>로그인</Link>
                )}
            </StyledFooter>
        </StyledAuthForm>
    );
};

export default AuthForm;