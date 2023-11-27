import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { FadeAni } from './MyPage';
import { db } from '../fireBase';
import parse from 'html-react-parser';
import { collection, getDocs, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// 이미지를 따로 가져올 수 있는가

const FeedContainer = styled.div`
  width: 100%;
  padding: 0 18rem;
  @media screen and (max-width: 1400px) {
    padding: 0 7rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  animation: ${FadeAni} 0.5s forwards;
`;

const FeedButtonBox = styled.div`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  width: 80px;
  padding: 0.6rem;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  ${(props) => {
    if (props.$current === props.children) {
      return css`
        font-weight: 600;
        border-bottom: 2px solid black;
      `;
    }
  }}
`;

const GridSection = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const PostCard = styled.div`
  max-width: 400px;
  min-width: 250px;
  height: 400px;
  border-radius: 5px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (max-width: 1400px) {
    max-width: 300px;
  }
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

const PostImg = styled.img`
  width: 100%;
  display: block;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 200px;
  padding: 1rem;
  background-image: ${(props) => `url(${props.$img})`};
  background-position: center;
  background-size: cover;
  border: 1px solid #d7d7d7;
`;

const PostContentSection = styled.div`
  width: 100%;
  height: 150px;
  padding: 1rem;
  line-height: 1.2;
  font-size: 1.25rem;
  overflow: hidden;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 13;
`;

const PostTitle = styled.div`
  width: 100%;
  margin-block: 0.5rem;
  font-size: 1.25rem;
`;

const PostContent = styled.div`
  width: 100%;
  overflow-y: hidden;
  word-break: break-all;
  margin-block: 0.5rem;
`;

const PostDate = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
`;

const PostInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #7d7d7d50;
  padding: 1rem;
`;

const UserInfo = styled.div`
  width: fit-content;
`;

const LikeIcon = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Feeds() {
  const buttons = ['트렌드', '최신'];
  const [currentTarget, setCurrentTarget] = useState('트렌드');

  const navi = useNavigate();

  const [feeds, setFeeds] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'posts'));
        const querySnapshot = await getDocs(q);

        const initialPosts = [];
        querySnapshot.forEach((post) => {
          const data = { id: post.id, ...post.data() };
          initialPosts.push(data);
        });
        setFeeds(initialPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleCurrent = (e) => {
    setCurrentTarget(e.target.innerText);
  };

  const goDetail = (e) => {
    e.stopPropagation();
    navi(`/post/${e.target.id}`);
  };

  const pattern = /https?:\/\/firebasestorage\.googleapis\.com[^\s"]+/;

  return (
    <FeedContainer>
      <FeedButtonBox>
        {buttons.map((el, i) => (
          <FilterButton key={i} onClick={handleCurrent} $current={currentTarget}>
            {el}
          </FilterButton>
        ))}
      </FeedButtonBox>
      <GridSection>
        {feeds?.map((post, i) => {
          return (
            <PostCard key={i} id={post.cid} onClick={(e) => goDetail(e)}>
              <div id={post.cid} onClick={(e) => goDetail(e)}>
                {post?.content.match(pattern) === null ? null : (
                  <PostImg id={post.cid} onClick={(e) => goDetail(e)} src={post?.content.match(pattern)}></PostImg>
                )}
                <PostContentSection id={post.cid} onClick={(e) => goDetail(e)}>
                  <PostTitle>{post.title}</PostTitle>
                  <PostContent>{parse(post.content)}</PostContent>
                </PostContentSection>
                <PostDate>2023년 11월 25일 － 7개의 댓글</PostDate>
              </div>

              <PostInfo>
                <UserInfo>유저이미지 by 유저 아이디</UserInfo>
                <LikeIcon>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>48</p>
                </LikeIcon>
              </PostInfo>
            </PostCard>
          );
        })}
      </GridSection>
    </FeedContainer>
  );
}
