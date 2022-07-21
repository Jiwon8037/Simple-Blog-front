import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Responsive from '../common/Responsive';

const StyledPostViewer=styled(Responsive)`
    margin-top: 4rem;
`;
const PostHead=styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1{
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;
const SubInfo=styled.div`
    margin-top: 1rem;
    color:${palette.gray[6]};
    span+span:before{
        color:${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content:'\\B7';
    }
`;
const Tags=styled.div`
    margin-top: 0.5rem;
    .tag{
        display: inline-block;
        color:${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover{
            color:${palette.cyan[6]};
        }
    }
`;
const PostContent=styled.div`
    font-size: 1.3125rem;
    color:${palette.gray[8]};
`;

const PostViewer = ({post,error,loading}) => {
    if(error){
        if(error.response&&error.response.status==404){
            return<StyledPostViewer>404 Not Found!</StyledPostViewer>
        }
        return <StyledPostViewer>오류 발생!</StyledPostViewer>
    }
    if(loading||!post){
        return null;
    }

    const {title,body,user,publishedDate,tags}=post;

    return (
        <StyledPostViewer>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{user.username}</b>
                    </span>
                    <span>{new Date(publishedDate).toLocaleDateString()}</span>
                </SubInfo>
                <Tags>
                    {tags.map(tag=>(
                        <div className='tag'>#{tag}</div>
                    ))}
                </Tags>
            </PostHead>
            <PostContent dangerouslySetInnerHTML={{__html:body}}/>
        </StyledPostViewer>
    );
};

export default PostViewer;