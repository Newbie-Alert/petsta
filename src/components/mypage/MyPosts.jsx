import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { db, storage } from '../../fireBase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import PostImages from './PostImages';
import parse from 'html-react-parser';

function MyPosts({ title, content, postId, setPost }) {
  const [isEditing, setIsEditig] = useState(false);
  const [imageUpload, setImageUpload] = useState(null); // 업로드할 이미지
  const [imageList, setImageList] = useState([]);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');

  // 게시물 수정에 필요한 핸들러들
  const showEditPostHandler = () => {
    setIsEditig(true);
  };
  const cancelEditPostHandler = () => {
    setIsEditig(false);
  };
  const onChangeEditTitle = (e) => {
    setEditingTitle(e.target.value);
  };
  const onChangeEditContent = (e) => {
    setEditingContent(e.target.value);
  };
  // 게시물 삭제 핸들러
  const deletePostHandler = async () => {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
    setPost((prev) => {
      return prev.filter((el) => el.id !== postId);
    });
  };

  // 게시물 수정 핸들러
  const editPostHandler = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', postId);
    // 새로운 제목 또는 내용만 업데이트
    const updatedData = {};
    if (editingTitle) {
      updatedData.title = editingTitle;
    }
    if (editingContent) {
      updatedData.content = editingContent;
    }
    try {
      await updateDoc(docRef, updatedData);
      setPost((prev) => prev.map((p) => (p.id === postId ? { ...p, ...updatedData } : p)));
      setIsEditig(false);
    } catch (err) {
      console.log(err);
    }
  };

  const imageFolderRef = ref(storage, postId);
  useEffect(() => {
    listAll(imageFolderRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // 게시물 수정할 때 이미지 업로드 핸들러
  const uploadImage = () => {
    if (imageUpload === null) return; // 업로드할 이미지 없을 시 아무것도 반환하지 않음
    // storage 레퍼런스 (업로드 장소(폴더))
    const imageRef = ref(storage, `${postId}/${imageUpload.name + v4()}`);
    // 폴더에 파일 인풋에 업로드한 이미지파일 저장
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
        alert('이미지가 성공적으로 업로드 되었습니다.');
      });
    });
  };
  // 이미지 삭제 핸들러
  const deleteImage = (url) => {
    listAll(imageFolderRef).then((res) => {
      res.items.forEach((item) => {
        const bucketRef = ref(storage, `gs://${item.bucket}/${item.fullPath}`);
        if (url.includes(bucketRef.name)) {
          deleteObject(bucketRef)
            .then(() => {
              setImageList(imageList.filter((post) => !post.includes(url)));
              alert('이미지가 삭제되었습니다.');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    });
  };

  return (
    <MyPostsContainer>
      {!isEditing ? (
        <MyPostCard>
          <PostContainer>
            <PostInfo>
              <h3>{title}</h3>
              <p>{parse(content)}</p>
              <PostImageContainer>
                <PostImages imageList={imageList} deleteImage={deleteImage} isEditing={isEditing}></PostImages>
              </PostImageContainer>
            </PostInfo>
            <ButtonWrapper>
              <button onClick={showEditPostHandler}>수정</button>
              <button onClick={deletePostHandler}>삭제</button>
            </ButtonWrapper>
          </PostContainer>
        </MyPostCard>
      ) : (
        <MyPostCard>
          <PostContainer>
            <PostInfo>
              <input type="text" defaultValue={title} onChange={onChangeEditTitle} />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                defaultValue={content?.replace(/["]+/g, '').replace(/<[^>]*>/g, '')}
                onChange={onChangeEditContent}
              ></textarea>
              <InputAndButtonWrapper>
                <input type="file" accept="image/*" onChange={(e) => setImageUpload(e.target.files[0])} />
                <button onClick={uploadImage}>업로드 이미지</button>
              </InputAndButtonWrapper>
              <PostImageContainer>
                <PostImages imageList={imageList} deleteImage={deleteImage} isEditing={isEditing}></PostImages>
              </PostImageContainer>
            </PostInfo>
            <ButtonWrapper>
              <button onClick={editPostHandler}>수정완료</button>
              <button onClick={cancelEditPostHandler}>수정취소</button>
            </ButtonWrapper>
          </PostContainer>
        </MyPostCard>
      )}
    </MyPostsContainer>
  );
}

// STYLED-COMPONENTS
const MyPostsContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const MyPostCard = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
  padding: 30px 0;
  width: 900px;
  border: 1px solid #c7c7c7a2;
  border-radius: 10px;
`;

const PostContainer = styled.div`
  display: flex;
  gap: 50px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 720px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & button {
    background-color: #ff5036;
    border: 1px solid #ff5036;
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bolder;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  & button {
    background-color: #ff5036;
    border: 1px solid #ff5036;
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bolder;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const PostImageContainer = styled.div`
  display: flex;
  gap: 20px;

  & img {
    width: 100px;
    height: 100px;
  }
`;

export default MyPosts;
