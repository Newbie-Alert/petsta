import React, { useEffect, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { fetchData } from '../fireBase';
import styled from 'styled-components';

const EditContainer = styled.div`
  /* 에디터 부분 전부 감싸는 박스 */
  padding: 10px;
  margin: auto;
  width: 500px;
  height: 700px;
  text-align: left;
  box-sizing: border-box;
  overflow: auto;

  h1 {
    background-color: aliceblue;
  }
  i {
    font-style: italic;
  }
  strong {
    font-weight: bold;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  p {
    display: block;
    font-size: 18px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  img {
    width: 30%;
    height: 30%;
    text-align: center;
  }
`;

function ContentsViewer({ postId }) {
  const [contents, setContents] = useState('');
  const [title, setTitle] = useState('');
  const [shouldRenderViewer, setShouldRenderViewer] = useState(false);
  useEffect(() => {
    const fetchPostData = async () => {
      const posts = await fetchData();
      const post = posts.find((post) => post.id === postId);
      setContents(post.content);
      setTitle(post.title);
      console.log('넣기전', contents);
      console.log('내용', post.content);
      await new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
      });
      setShouldRenderViewer(true);
    };
    fetchPostData();
  }, [postId]);

  return (
    <EditContainer>
      <h1> {title}</h1>
      {shouldRenderViewer ? <Viewer initialValue={contents} /> : '로딩중! 이에요 잠시만요!!'}
    </EditContainer>
  );
}
export default ContentsViewer;
