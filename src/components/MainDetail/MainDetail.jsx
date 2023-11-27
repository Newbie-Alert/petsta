import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../fireBase';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

function MainDetail() {
  const [posts, setPosts] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const querySnapshot = await getDocs(postsRef);

        const postsList = [];
        querySnapshot.forEach((doc) => {
          postsList.push({ id: doc.id, ...doc.data() });
        });

        setPosts(postsList);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  const goDetail = (e) => {
    e.stopPropagation();
    navi(`/post/${e.target.id}`);
  };

  const pattern = /https?:\/\/firebasestorage\.googleapis\.com[^\s"]+/;

  return (
    <>
      <MyPostsContainer>
        <MainTitle>SPOT RECOMMEND</MainTitle>
        {posts?.map((post) => (
          <MyPostCard key={post.id} id={post.cid} onClick={goDetail}>
            <PostImageContainer id={post.cid} onClick={goDetail}>
              {post.content.match(pattern) === null ? (
                <h1 id={post.cid} onClick={goDetail}>
                  이미지가 없습니다
                </h1>
              ) : (
                <img id={post.cid} onClick={goDetail} src={post?.content.match(pattern)} alt="Image" />
              )}
            </PostImageContainer>
            <PostInfo id={post.cid} onClick={goDetail}>
              <div id={post.cid} onClick={goDetail}>
                {post.user}
              </div>
              <Title id={post.cid} onClick={goDetail}>
                {post.title}
              </Title>
              <div id={post.cid} onClick={goDetail}>
                {parse(post.content)}
              </div>
            </PostInfo>
          </MyPostCard>
        ))}
      </MyPostsContainer>
    </>
  );
}

// 스타일
const MainTitle = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #ff5036;
`;

const MyPostsContainer = styled.div`
  margin-bottom: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    padding: 0 20px;
  }
`;

const MyPostCard = styled.div`
  display: flex;

  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #c7c7c7a2;
  cursor: pointer;

  &:hover {
    background-color: #eee;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const PostImageContainer = styled.div`
  flex: 1;

  & img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }

  @media screen and (max-width: 900px) {
    & img {
      width: 100%;
      height: auto;
    }
  }
`;

const PostInfo = styled.div`
  flex: 2;
  line-height: 1.5;
  height: 200px;
  overflow: hidden;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export default MainDetail;
