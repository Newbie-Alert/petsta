import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { db } from '../fireBase';
import Swal from 'sweetalert2';
import { updateDoc, getDocs, getDoc, doc, collection } from 'firebase/firestore';

import { myFollowList } from '../redux/modules/follow';

// 이미지를 따로 가져올 수 있는가

const FollowContainer = styled.div`
  width: 100%;
  padding: 0 18rem;
  @media screen and (max-width: 1400px) {
    padding: 0 7rem;
  }
  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const FollowButtonBox = styled.div`
  width: fit-content;
  padding: 0.3rem 0.6rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FilterButton = styled.button`
  width: 100px;
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
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FollowCard = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 5px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const FollowImg = styled.div`
  width: 100%;
  display: block;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 200px;
  padding: 1rem;
  background-image: ${(props) => `url(${props.$img})`};
  background-position: center;
  background-size: cover;
`;

const FollowNameSection = styled.div`
  width: 100%;
  padding: 1rem;
`;

const FollowTitle = styled.h3`
  width: 100%;
  font-size: 1.25rem;
`;

const FollowInterests = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  overflow-x: scroll;
  overflow-y: hidden;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;
`;

const FollowInterestsList = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ left }) => `${left * 25}%`};
  transform: translateY(-50%);
  width: 20%;
  height: 93px;
  margin: 0 5%;
  border-radius: 10px;
  background-color: #bbb;
`;

const FollowInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border-top: 1px solid #7d7d7d50;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ $isFollow }) => ($isFollow === true ? '#eee' : '#bbb')};
    color: ${({ $isFollow }) => ($isFollow === true ? '#000' : '#fff')};
    cursor: ${({ $isFollow }) => ($isFollow === true ? 'default' : 'pointer')};
  }
`;

const FollowBtn = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Follow() {
  const buttons = ['팔로우 추천', '팔로우 목록'];
  const [currentTarget, setCurrentTarget] = useState('팔로우 추천');
  const [userInfo, setUserInfo] = useState({ follower: [] });
  const follow = useSelector((state) => state.follow);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDatafollower = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const follower = [];
      snapshot.forEach((doc) => {
        follower.push({ id: doc.id, ...doc.data() });
      });
      const user = JSON.parse(localStorage.getItem('user'));
      function shuffle(array) {
        let filArr = array.filter((x) => x.id !== user.uid);

        let arr = [];

        for (let i = 0; i < 2; i++) {
          arr.push(filArr[i]);
        }
        return arr;
      }
      dispatch(myFollowList(shuffle(follower)));
    };
    const fetchDatafollow = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const snapshot = await getDoc(doc(db, 'users', user.uid));
      const follow = [];
      follow.push({ id: snapshot.id, ...snapshot.data() });
      const followData = async () => {
        let follower = [];
        for (let i = 0; i < follow[0]?.follower?.length; i++) {
          const snapshot = await getDoc(doc(db, 'users', follow[0].follower[i]));
          follower.push({ id: snapshot.id, ...snapshot.data() });
        }
        dispatch(myFollowList(follower));
      };
      followData();
    };
    switch (currentTarget) {
      case '팔로우 추천':
        fetchDatafollower();
        break;
      case '팔로우 목록':
        fetchDatafollow();
        break;
      default:
        break;
    }
    const user = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const snapshot = await getDoc(doc(db, 'users', user.uid));
        let result = { id: snapshot.id, ...snapshot.data() };
        setUserInfo({ ...userInfo, ...result });
      } catch (error) {
        console.log(error);
      }
    };
    user();
  }, [currentTarget]);

  const handleCurrent = (e) => {
    setCurrentTarget(e.target.innerText);
  };
  const updateFollow = async (fol) => {
    const followRef = doc(db, 'users', userInfo?.id);
    const addfollow = userInfo?.follower;
    addfollow?.unshift(fol);
    await updateDoc(followRef, { ...userInfo, follower: addfollow })
      .then(() => {
        Swal.fire({
          title: '<span style="font-size: 22px;">팔로우 완료!</span>',
          html: `<p style="font-size: 14px;">${userInfo.profilename}님에게 팔로우 하였습니다.</p>`,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF5036',
          width: '28rem',
          imageUrl: '/assets/img/logo.png',
          imageWidth: 120
        });
        setUserInfo({ ...userInfo, follower: addfollow });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FollowContainer>
      <FollowButtonBox>
        {buttons.map((el, i) => (
          <FilterButton key={i} onClick={handleCurrent} $current={currentTarget}>
            {el}
          </FilterButton>
        ))}
      </FollowButtonBox>
      <GridSection>
        {follow.followList.map((follow, i) => {
          return (
            <FollowCard key={i}>
              <div>
                {follow.profilimg === null ? null : <FollowImg $img={follow.profileimgURL}></FollowImg>}
                <FollowNameSection>
                  <FollowTitle>{follow.profilename}</FollowTitle>
                  {/* <PostContent>앙</PostContent> */}
                </FollowNameSection>
              </div>
              <FollowInterests>
                {[].map((item, index) => {
                  return <FollowInterestsList left={index}>{item}</FollowInterestsList>;
                })}
              </FollowInterests>
              {userInfo?.follower?.includes(follow.id) ? (
                <FollowInfo $isFollow={true}>
                  <FollowBtn>Follow 완료</FollowBtn>
                </FollowInfo>
              ) : (
                <FollowInfo
                  onClick={() => {
                    updateFollow(follow.id);
                  }}
                >
                  <FollowBtn>Follow</FollowBtn>
                </FollowInfo>
              )}
            </FollowCard>
          );
        })}
      </GridSection>
    </FollowContainer>
  );
}
