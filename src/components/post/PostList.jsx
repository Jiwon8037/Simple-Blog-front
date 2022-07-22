import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Responsive from '../common/Responsive';
import Button from '../common/Button';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';
import {Link} from 'react-router-dom';

const StyledPostList=styled(Responsive)`
    margin-top: 3rem;
`;
const WritePostButtonWrapper=styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;
const StyledPostItem=styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    &:first-child{
        padding-top: 0;
    }
    &+&{
        border-top: 1px solid ${palette.gray[2]};
    }
    h2{
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover{
            color:${palette.gray[6]};
        }
    }
    p{
        margin-top: 2rem;
    }
`;
const PostItem=({post})=>{
    const {publishedDate,user,tags,title,body,_id}=post;
    return(
        <StyledPostItem>
            <h2>
                <Link to={`/@${user.username}/${_id}`}>{title}</Link>
            </h2>
            <SubInfo username={user.username} publishDate={new Date(publishedDate)}/>
            <Tags tags={tags}/>
            <p>{body}</p>
        </StyledPostItem>
    );
};

const PostList = ({posts,loading,error,showWriteButton}) => {
    if(error){
        return <StyledPostList>에러 발생</StyledPostList>
    }

    return (
        <StyledPostList>
            <WritePostButtonWrapper>
                {showWriteButton&&(
                    <Button cyan to='/write'>새 글 작성</Button>
                )}
            </WritePostButtonWrapper>
            {!loading&&posts&&(
                <div>
                    {posts.map(post=>(
                        <PostItem post={post} key={post._id}/>
                    ))}
                </div>
            )}
        </StyledPostList>
    );
};  

export default PostList;