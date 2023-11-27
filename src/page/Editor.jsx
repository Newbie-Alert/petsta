import React from 'react';
import styled from 'styled-components';
import { saveData, uploadImage } from '../fireBase';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditor, setContent, setTitle } from '../redux/modules/editor';
import { useNavigate } from 'react-router-dom';

const EditWrapper = styled.div`
  width: 100%;
  padding: 3rem 5rem 2rem 5rem;
`;

const PostingTitle = styled.div`
  /* 상단 제목 입력부분 스타일 */
  input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 56px;
    border: none;
    font-size: 30px;
    color: #202020;
    resize: none;
    outline: 0 none;
    line-height: 40px;
    overflow: hidden;
    letter-spacing: -0.4px;
  }
  input:focus {
    border: 1px solid #ff2e00;
  }
  img {
    width: 30%;
    height: 30%;
    text-align: center;
  }
`;

const EditorInput = styled.input`
  width: 100%;
  font-size: 1.25rem;
  padding: 1rem;
  &::placeholder {
    font-size: 2.25rem;
  }
`;

const EditContainer = styled.div`
  border-radius: 5px;
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.5rem 0;
`;

const EditBtn = styled.button`
  box-sizing: border-box;
  background-color: #ff2e00;
  width: fit-content;
  padding: 0.5rem 0.7rem;
  font-weight: 600;
  color: white;
  border: none;
  align-items: flex-end;
  border-radius: 5px;
  cursor: pointer;
`;
export function EditorBox() {
  const dispatch = useDispatch();
  const editorState = useSelector((state) => state.editorReducer);
  const editorRef = useRef();

  const navi = useNavigate();

  // FUNCTIONS
  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    dispatch(setContent(data));
    console.log(data);
  };

  const onUploadImage = async (blob, callback) => {
    const url = await uploadImage(blob);
    console.log(blob);
    callback(url, 'alt text');
    return false;
  };

  // 현재 로그인 사용자의 uid
  const uid = JSON.parse(localStorage.getItem('user')).uid;

  const onSaveData = async () => {
    await saveData(uid, editorState.editTitle, editorState.editorData);
    dispatch(resetEditor());
    console.log('완료');
    // navigate(`/post/${editorState.editId}`);
    // const data = editorRef.current.getInstance().getHTML();

    // // 서버로 데이터 전송
    // await saveData(editTitle, data);
    alert('게시물 등록이 완료되었습니다');
    navi('/');
  };

  return (
    <EditWrapper>
      <EditContainer>
        <PostingTitle>
          <EditorInput
            type="text"
            value={editorState.editTitle}
            placeholder="제목을 입력하세요"
            onChange={(e) => dispatch(setTitle(e.target.value))}
          />
        </PostingTitle>
        <Editor
          initialValue=""
          placeholder="내용 입력하세요"
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          ref={editorRef}
          onChange={onChange}
          plugins={[colorSyntax]}
          hooks={{
            addImageBlobHook: onUploadImage
          }}
        />
        <ButtonBox>
          <EditBtn onClick={onSaveData}>작 성 완 료</EditBtn>
        </ButtonBox>
      </EditContainer>
    </EditWrapper>
  );
}

export default EditorBox;
