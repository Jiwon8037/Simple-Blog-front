import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';

const StyledPostActionButtons=styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
`;
const StyledActionButton=styled.div`
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color:${palette.gray[6]};
    font-weight: bold;
    outline: none;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover{
        background: ${palette.gray[1]};
        color:${palette.cyan[7]};
    }
    &+&{
        margin-left: 0.25rem;
    }
`;

const PostActionButtons = ({onEdit}) => {
    return (
        <StyledPostActionButtons>
            <StyledActionButton onClick={onEdit}>수정</StyledActionButton>
            <StyledActionButton>삭제</StyledActionButton>
        </StyledPostActionButtons>
    );
};

export default PostActionButtons;