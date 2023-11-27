import React from 'react';
import styled from 'styled-components';

function PostImages({ imageList, deleteImage, isEditing }) {
  return (
    <PostImageContainer>
      {imageList.map((url) => {

        console.log(url);
        return (
          <div>
            <img src={url} alt="게시글 이미지" />
            {!isEditing ? null : <button onClick={() => deleteImage(url)}>X</button>}
          </div>
        );
      })}
    </PostImageContainer>
  );
}

export default PostImages;

const PostImageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  & img {
    width: 100px;
    height: 100px;
  }

  & button {
    width: 24px;
    height: 24px;
    padding: 4px;
    background-color: #ff5036;
    color: #fff;
    font-weight: 700;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;
