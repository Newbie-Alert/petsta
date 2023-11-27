import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tokenStorage from '../../util/storage';
import { useDispatch, useSelector } from 'react-redux';
import { remove_user } from '../../redux/modules/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../fireBase';

// Styled-Components
const HeaderContainer = styled.div`
  width: 100%;
  padding: 1rem 21rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;

  @media screen and (max-width: 1400px) {
    padding: 1rem 4rem;
  }

  @media screen and (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

const Logo = styled.div`
  width: fit-content;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3.6rem;
  transition: all 0.4s ease;

  // 768px 이하 반응형
  @media screen and (max-width: 768px) {
    position: fixed;
    right: ${(props) => (props.$toggle === true ? '0%' : '-100%')};
    bottom: 22%;
    width: 300px;
    padding: 1rem 1.65rem;
    gap: 1.5rem;
    background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8));
    z-index: 1;
    flex-direction: column;
  }
`;

const MenuItem = styled.div`
  position: relative;
  width: fit-content;
  font-size: 1.3rem;
  padding: 0.3rem 0;
  font-weight: 600;
  color: var(--primary-color);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  &::after {
    position: absolute;
    bottom: -6px;
    left: 0;
    content: '';
    width: 0%;
    height: 2px;
    background-color: var(--primary-color);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  &:hover {
    &::after {
      width: 100%;
    }
  }

  // 768px 이하 반응형
  @media screen and (max-width: 768px) {
    &:hover {
      &::after {
        width: 100%;
      }
    }
  }
`;

const ButtonContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`;

const WriteButton = styled.h2`
  width: fit-content;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 1.3rem;
`;

const Button = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: 90px;
  height: fit-content;
  padding: 0.3rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  // props에 따른 border, bg-color, color 변경
  border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid var(--primary-color)' : '1px solid white')};

  background-color: ${(props) => (props.$bgColor === 'Log in' ? 'transparent' : 'var(--primary-color)')};

  color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'white')};

  // hover 시 props에 따른 border, bg-color, color 변경
  &:hover {
    background-color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'transparent')};
    color: ${(props) => (props.$bgColor === 'Log in' ? 'white' : 'var(--primary-color)')};
    border: ${(props) => (props.$bgColor === 'Log in' ? '1px solid white' : '1px solid var(--primary-color)')};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  background-color: #5b5b5b;
  color: white;
  cursor: pointer;
  position: relative;
`;

const UserName = styled.h3`
  position: absolute;
  top: 48%;
  left: 48%;
  transform: translate(-50%, -50%);
  font-size: 1.65rem;
`;

const MenuButton = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 9px;
  background-color: white;
  border: 3px solid var(--primary-color);
  position: fixed;
  bottom: 15.5%;
  right: -1%;
  z-index: 1;
  padding-top: 0.8rem;
  padding-left: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: none;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

// Main Component
export default function Header() {
  // Redux States
  const reduxUser = useSelector((state) => state.users);
  const dispatch = useDispatch();

  // STATES
  const [menuToggle, setMenuToggle] = useState(false);

  // 현재 로그인 유저 email, uid
  const curUserInfo = useRef('');

  // Navigate Hook
  const navi = useNavigate();

  // Token을 가졌나 안 가졌나 확인
  const [hasToken, setHasToken] = useState(false);

  // follow버튼클릭을 위한 userid
  const [users, setUsers] = useState([]);

  // Styled-Components 반복 생성 시 사용하는 변수
  const menu = ['Posts', 'Products', 'Follow', 'Support'];
  const buttons = ['Log in', 'Register'];
  const loginedButton = ['Log Out'];

  // 초기 렌더 시 localStoragedp user데이터를 ref에 담아 로그인 유저 정보 유지
  useEffect(() => {
    const userdata = async () => {
      const q = query(collection(db, 'users'));
      const querySnapshot = await getDocs(q);
      const initialUsers = [];
      querySnapshot.forEach((doc) => {
        initialUsers.push(doc.id);
      });
      setUsers(initialUsers);
    };
    userdata();
    if (localStorage.getItem('user') !== null) {
      curUserInfo.current = JSON.parse(localStorage.getItem('user'));
      setHasToken(true);
    }
  }, [reduxUser]);
  // FUNCTIONS
  const handleToggle = () => {
    setMenuToggle((prev) => !prev);
  };

  // 로그인 페이지로~
  const goLogin = (e) => {
    e.target.innerText === 'Log in' && navi('/login');
    e.target.innerText === 'Register' && navi('/signup');

    setMenuToggle(false);
  };

  // 글 작성 페이지로
  const goWrite = () => {
    navi('/write');
    setMenuToggle(false);
  };

  // 로그아웃_localStorage의 정보를 비우고, 페이지를 새로고침 합니다.
  const logOut = () => {
    new tokenStorage().clearToken();
    setHasToken(false);
    localStorage.removeItem('user');
    dispatch(remove_user());
    navi('/', { replace: true });
  };

  // 마이페이지로~

  const goMyPage = () => {
    const uid = JSON.parse(localStorage.getItem('user'))?.uid;
    navi(`/mypage/${uid}`);
  };

  // 홈으로~
  const goHome = () => {
    navi('/');
    setMenuToggle(false);
  };

  const menuNavi = (e) => {
    const user = JSON.parse(localStorage.getItem('user'));
    e.target.innerText === 'Posts' && navi('/posts');
    e.target.innerText === 'Products' && navi('/shop');
    if (e.target.innerText === 'Follow') {
      const userdata = async () => {
        const q = query(collection(db, 'users'));
        const querySnapshot = await getDocs(q);
        const initialUsers = [];
        querySnapshot.forEach((doc) => {
          initialUsers.push(doc.id);
        });
        setUsers(initialUsers);
        if (user === null) {
          alert('로그인페이지로 이동입니다.');
          navi('/login');
        } else if (!initialUsers.includes(user.uid)) {
          alert('프로필 등록페이지로 이동입니다.');
          navi(`/addprofile/${user.uid}`);
        } else {
          navi('/follow');
        }
      };
      userdata();
    }
    setMenuToggle(false);
  };

  // user email을 받아와 반환합니다
  const returnUserName = () => {
    return curUserInfo.current.email;
  };

  // curUserEmail이 비어있지 않다면 Header의 UI가 나옵니다

  return (
    <>
      <HeaderContainer>
        <Logo onClick={() => goHome()}>
          <img width="100px" src="/assets/images/logo.png" alt="" />
        </Logo>
        <MenuContainer $toggle={menuToggle}>
          {menu.map((menu) => (
            <MenuItem onClick={menuNavi} key={menu}>
              {menu}
            </MenuItem>
          ))}
        </MenuContainer>
        <ButtonContainer>
          {hasToken === true
            ? loginedButton.map((text, i) => (
                <UserContainer key={i}>
                  <WriteButton onClick={() => goWrite()}>글쓰기</WriteButton>
                  <Button onClick={() => logOut()} key={text} $bgColor={text}>
                    {text}
                  </Button>
                  <UserIcon onClick={() => goMyPage()}>
                    <UserName>{returnUserName().charAt(0)}</UserName>
                  </UserIcon>
                </UserContainer>
              ))
            : buttons.map((text) => (
                <Button onClick={(e) => goLogin(e)} key={text} $bgColor={text}>
                  {text}
                </Button>
              ))}
        </ButtonContainer>
      </HeaderContainer>
      <MenuButton onClick={handleToggle}>
        {menuToggle ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
      </MenuButton>
    </>
  );
}
