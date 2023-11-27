import React from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

// STYLED-COMPONENTS
const RecommendPostBox = styled.div`
  width: 75%;
  border-radius: 9px;
  background-color: white;
  box-shadow: 2px 3px 9px 0px #00000050;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 2rem 2rem 2rem;
  margin-block: 1.25rem;

  @media screen and (max-width: 960px) {
    width: 100%;
    margin-block: 1rem;
    padding: 0.5rem 0 2rem 1rem;
  }
`;

const RecommendTitle = styled.h3`
  width: 100%;
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: 1rem;
  position: relative;
  margin-bottom: 0.5rem;
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: -9px;
    left: 0;
    background-color: #00000080;
  }

  @media screen and (max-width: 768px) {
    &::after {
      width: 95%;
    }
  }
`;

const RecommendUserInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const RecommendUserImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-image: url('/assets/images/main_banner.jpg');
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 768px) {
    width: 65px;
    height: 65px;
  }
`;

const RecommendUserName = styled.h4`
  width: fit-content;
  font-weight: 600;
  font-size: 1.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const RecommendContentBox = styled.div`
  background-color: #eee;
  width: 95%;
  border-radius: 5px;
  padding: 1rem;
`;

const RecommendPostContent = styled.div`
  width: 80%;
  height: 1.5rem;
  word-wrap: break-word;
  line-height: 1.5;
  font-size: 1.25rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const MoreButton = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: 90px;
  height: fit-content;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid var(--primary-color);
  background-color: transparent;
  color: var(--primary-color);

  &:hover {
    background-color: var(--primary-color);
    color: white;
    border: 1px solid white;
  }
`;

// MAIN COMPONENTS
export default function RecommendGrid({ data }) {
  const navi = useNavigate();

  const goRecommend = () => {
    navi('/maindetail');
  };

  return (
    <>
      {data[0]?.slice(0, 4).map((post) => {
        return (
          <RecommendPostBox onClick={() => goRecommend()} key={post.id}>
            <RecommendTitle>{post.title}</RecommendTitle>
            <RecommendUserInfo>
              <RecommendUserImg />
              <RecommendUserName>{post.username}</RecommendUserName>
            </RecommendUserInfo>
            <RecommendContentBox>
              <RecommendPostContent>{parse(post.content)}</RecommendPostContent>
            </RecommendContentBox>

            <MoreButton>더 보기</MoreButton>
          </RecommendPostBox>
        );
      })}
    </>
  );
}
