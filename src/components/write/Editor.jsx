import Quill from 'quill';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Responsive from '../common/Responsive';
import 'quill/dist/quill.bubble.css';

const StyledEditor=styled(Responsive)`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;
const StyledTitleInput=styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    margin-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;
const QuillWrapper=styled.div`
    .ql-editor{
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before{
        left:0px;
    }
`;

const Editor = () => {
    const quillElement=useRef(null);
    const quillInstance=useRef(null);

    useEffect(()=>{
        quillInstance.current=new Quill(quillElement.current,{
            theme:'bubble',
            placeholder:'내용을 작성하세요...',
            modules:{
                toolbar:[
                    [{header:'1'},{header:'2'}],
                    ['bold','italic','underline','strike'],
                    [{list:'ordered'},{list:'bullet'}],
                    ['blockquote','code-block','link','image'],
                ],
            },
        });
    },[]);

    return (
        <StyledEditor>
            <StyledTitleInput placeholder='제목을 입력하세요...'/>
            <QuillWrapper>
                <div ref={quillElement}/>
            </QuillWrapper>
        </StyledEditor>
    );
};

export default Editor;