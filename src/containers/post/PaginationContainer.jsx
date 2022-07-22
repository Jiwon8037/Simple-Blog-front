import React from 'react';
import { useSelector } from 'react-redux';
import {useSearchParams ,useParams} from 'react-router-dom';
import Pagination from '../../components/post/Pagination';

const PaginationContainer = () => {
    const [searchParams]=useSearchParams();
    const {username}=useParams();
    const tag=searchParams.get('tag');
    const page=parseInt(searchParams.get('page'),10)||1;

    const {lastPage,posts,loading}=useSelector(({posts,loading})=>({
        lastPage:posts.lastPage,
        posts:posts.posts,
        loading:loading['posts/LIST_POSTS'],
    }));

    if(!posts||loading)return null;

    return (
        <Pagination tag={tag} username={username} page={parseInt(page,10)} lastPage={lastPage}/>
    );
};

export default PaginationContainer;