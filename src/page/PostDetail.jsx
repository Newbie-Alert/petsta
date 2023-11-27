import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentsViewer from './Viewer';
import styled from 'styled-components';

const Container = styled.div`
  /* 에디터 부분 전부 감싸는 박스 */
  padding: 10px;
  margin: auto;
  margin-top: 30px;
  width: 700px;
  height: 900px;
  text-align: center;
  border: 2px solid #ff2e00;
`;
const BackBtn = styled.button`
  box-sizing: border-box;
  background-color: ${(props) => props.bg};
  width: 150px;
  margin-top: 5px;
  color: white;
  border: none;
  font-size: 20px;

  border-radius: 5px;
  padding: 5px;
`;
function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();

  return (
    <Container>
      <h1>게시글 상세 내용</h1>
      <ContentsViewer postId={postId} />
      <BackBtn bg={'#f27c7c'} onClick={() => navigate(-1)}>
        게시글 삭제
      </BackBtn>
      <div style={{ marginLeft: '100px' }}></div>
      <BackBtn bg={'#FF2E00'} onClick={() => navigate(-1)}>
        뒤로가기
      </BackBtn>
    </Container>
  );
}

export default PostDetail;
