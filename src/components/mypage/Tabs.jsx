import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

function Tabs({ onClickTab, activeTab }) {
  const navi = useNavigate();
  const { id } = useParams();

  const goWritePage = (e) => {
    e.target.innerText === '게시글 작성' && navi('/write');
    e.target.innerText === '프로필 수정' && navi(`/edit-profile/${id}`);
  };
  return (
    <TabWrapper>
      <TabContainer onClick={onClickTab}>
        <TabList $activeTab={activeTab}>프로필</TabList>
        <TabList $activeTab={activeTab}>내 게시글</TabList>
      </TabContainer>
      <button onClick={goWritePage}>{activeTab === '프로필' ? '프로필 수정' : '게시글 작성'}</button>
    </TabWrapper>
  );
}

export default Tabs;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  height: 120px;
  color: #ff5036;

  & button {
    padding: 10px 15px;
    border: 1px solid #ff5036;
    background-color: #ff5036;
    color: #fff;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const TabContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const TabList = styled.li`
  ${(props) => {
    if (props.$activeTab === props.children) {
      return css`
        font-weight: 700;
        border-bottom: 2px solid #ff5036;
      `;
    }
  }}

  padding: 5px 10px;
  cursor: pointer;
`;
