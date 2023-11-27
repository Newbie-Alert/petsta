import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { app, db } from '../fireBase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { FadeAni } from './MyPage';
import { useDispatch } from 'react-redux';
import { add_user } from '../redux/modules/users';

function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const navi = useNavigate();

  //이메일
  const handleEmail = (event) => {
    setEmail(event.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(event.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //패스워드
  const handlePassword = (event) => {
    setPassword(event.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(event.target.value)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  //파이어베이스 - 로그인
  const auth = getAuth(app);
  const signIn = (event, email, password) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((유저인증토큰객체) => {
        setEmail('');
        setPassword('');
        Swal.fire({
          title: '<span style="font-size: 22px;">로그인 성공!</span>',
          html: '<p style="font-size: 14px;">펫스타그램에 로그인이 완료 되었습니다.</p>',
          confirmButtonText: '확인',
          confirmButtonColor: '#FF5036',
          width: '28rem',
          imageUrl: '/assets/img/logo.png',
          imageWidth: 120
        }).then((value) => {
          const fetchData = async () => {
            const querySnapshot = await getDocs(query(collection(db, 'users')));
            const initialPets = [];
            querySnapshot.forEach((doc) => {
              initialPets.push({ uid: doc.id, ...doc.data() });
            });
            const filterData = initialPets.filter((x) => x.uid === 유저인증토큰객체.user.uid);

            if (value.isConfirmed === true) {
              const user = {
                uid: 유저인증토큰객체.user.uid,
                email: 유저인증토큰객체.user.email,
                token: 유저인증토큰객체.user.accessToken
              };
              dispatch(add_user(user));
              localStorage.setItem('user', JSON.stringify(user));
              navi('/');

              if (filterData.length === 0) {
                Swal.fire({
                  html: '<p style="font-size: 14px;">프로필 등록페이지로 이동합니다.</p>',
                  confirmButtonText: '확인',
                  confirmButtonColor: '#FF5036',
                  width: '28rem',
                  imageUrl: '/assets/img/logo.png',
                  imageWidth: 120
                });
                navi(`/addprofile/${유저인증토큰객체.user.uid}`);
              } else {
                navi(`/`);
              }
            }
          };
          fetchData();
        });
      })

      .catch((err) => {
        Swal.fire({
          title: '<span style="font-size: 18px;">이메일 또는 비밀번호가 유효하지 않습니다.</span>',
          text: '다시 시도해주세요',
          html: '<p style="font-size: 14px;">다시 시도해주세요</p>',
          icon: `error`,
          confirmButtonText: '확인',
          confirmButtonColor: '#FF5036',
          width: '28rem'
        });
      });
  };

  //파이어베이스 - 회원가입
  const signUp = (event, email, password) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((유저인증토큰객체) => {
        console.log(유저인증토큰객체.user);
        setEmail('');
        setPassword('');
        alert('회원가입이 완료 되었습니다');
        navi(`/addprofile/${유저인증토큰객체.user.uid}`);
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          Swal.fire({
            title: '<span style="font-size: 18px;">이미 사용중인 이메일입니다.</span>',
            text: '다시 시도해주세요',
            html: '<p style="font-size: 14px;">다시 시도해주세요</p>',
            icon: 'error',
            confirmButtonText: '확인',
            confirmButtonColor: '#FF5036',
            width: '28rem'
          });
        }
      });
  };

  // 파이어 배이스 - 소셜로그인 (Google, Facebook)
  const socialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, new provider());
      const user = result.user;
      setEmail('');
      setPassword('');
      Swal.fire({
        title: '<span style="font-size: 22px;">로그인 성공!</span>',
        html: '<p style="font-size: 14px;">펫스타그램에 로그인이 완료 되었습니다.</p>',
        confirmButtonText: '확인',
        confirmButtonColor: '#FF5036',
        width: '28rem',
        imageUrl: '/assets/img/logo.png',
        imageWidth: 120
      }).then((value) => {
        const fetchData = async () => {
          const querySnapshot = await getDocs(query(collection(db, 'users')));
          const initialPets = [];
          querySnapshot.forEach((doc) => {
            initialPets.push({ uid: doc.id, ...doc.data() });
          });
          const filterData = initialPets.filter((x) => x.uid === user.uid);
          if (value.isConfirmed === true) {
            const token = {
              uid: user.uid,
              email: user.email,
              token: user.accessToken
            };
            dispatch(add_user(token));
            localStorage.setItem('user', JSON.stringify(token));
            if (filterData.length === 0) {
              Swal.fire({
                html: '<p style="font-size: 14px;">프로필 등록페이지로 이동합니다.</p>',
                confirmButtonText: '확인',
                confirmButtonColor: '#FF5036',
                width: '28rem',
                imageUrl: '/assets/img/logo.png',
                imageWidth: 120
              });
              navi(`/addprofile/${user.uid}`);
            } else {
              navi(`/`);
            }
          }
        };
        fetchData();
      });
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  //로그아웃 - 현재 필요없는듯
  // const logOut = async () => {
  //   try {
  //     await signOut(auth);
  //     alert('로그아웃되었습니다.');
  //   } catch (error) {
  //     console.error('로그아웃 중 에러 발생:', error);
  //   }
  // };

  // 비활성화 버튼 -> 유효성검사에 따라 활성화
  useEffect(() => {
    if (emailValid && passwordValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, passwordValid]);

  return (
    <div>
      <Page>
        <Logo src="/assets/img/logo.png" alt="logo" />
        <form>
          <Title>로그인하시면 더 편리하게 이용하실 수 있어요.</Title>
          <ContentWrap>
            <div>이메일</div>
            <InputWrap>
              <Input placeholder="test@test.com" value={email} type="email" onChange={handleEmail} />
            </InputWrap>
            <ErrorMessage>{!emailValid && email.length > 0 && <div>올바른 이메일을 입력해주세요.</div>}</ErrorMessage>
            <div style={{ marginTop: '15px' }}>비밀번호</div>
            <InputWrap>
              <Input
                placeholder="영문,숫자,특수문자 포함 8자 이상"
                value={password}
                type="password"
                onChange={handlePassword}
              />
            </InputWrap>
            <ErrorMessage>
              {!passwordValid && password.length > 0 && <div>영문,숫자,특수문자 포함 8자 이상 입력해주세요.</div>}
            </ErrorMessage>
          </ContentWrap>
          <ButtonWrap>
            <ButtonJoin
              type="submit"
              onClick={(event) => {
                signUp(event, email, password);
              }}
            >
              회원가입
            </ButtonJoin>
            <ButtonLogin
              disabled={notAllow}
              onClick={(event) => {
                signIn(event, email, password);
              }}
            >
              로그인
            </ButtonLogin>
            <ButtonSocialLogin
              onClick={() => {
                socialLogin(GoogleAuthProvider);
              }}
              $logIn="google"
            >
              Google로 로그인 하기
            </ButtonSocialLogin>
            <ButtonSocialLogin
              onClick={() => {
                socialLogin(FacebookAuthProvider);
              }}
              $logIn="Facebook"
            >
              <img src="" alt="" />
              Facebook으로 로그인 하기
            </ButtonSocialLogin>
            {/* <ButtonLogout onClick={logOut}>로그아웃</ButtonLogout> */}
          </ButtonWrap>
        </form>
      </Page>
    </div>
  );
}

//---------------------------------
//스타일

//로그인페이지
const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh; /* 최소 높이 설정 */
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  overflow: hidden;
  animation: ${FadeAni} 0.5s forwards;
  @media screen and (max-width: 600px) {
    width: 90%;
    padding: 10px;
  }
`;

// 로고
const Logo = styled.img`
  width: 200px;
  margin-top: 50px;
  margin-left: -8px;
`;

//타이틀 - 로그인하시면 더 편리하게 이용하실 수 있어요.
const Title = styled.div`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
  color: #262626;
`;

//컨텐츠랩 - form
const ContentWrap = styled.div`
  margin-top: 37px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

//에러 메시지 - 올바른 이메일을 입력해주세요.
const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ff5036;
  font-size: 12px;
`;

//버튼 랩
const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

//회원가입 버튼
const ButtonJoin = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  font-weight: 700;
  color: #ff5036;
  border: 1px solid #ff5036;
  border-radius: 64px;
  margin-top: 40px;
  background-color: white;
  cursor: pointer;
`;

//로그인 버튼
const ButtonLogin = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  font-weight: 700;
  background-color: #ff5036;
  color: white;
  border-radius: 64px;
  /* color: #ff5036; */
  margin-top: 10px;
  cursor: pointer;
  &:disabled {
    background-color: #dadada;
    color: #ff5036;
  }
`;

// 소셜로그인 버튼 google GitHub Facebook
const ButtonSocialLogin = styled.div`
  width: 100%;
  height: 50px;
  border: none;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $logIn }) => ($logIn === 'Facebook' ? '#3b5998' : $logIn === 'GitHub' ? '#171515' : '#fff')};
  color: ${({ $logIn }) => ($logIn === 'google' ? '#000' : '#fff')};
  border: ${({ $logIn }) => ($logIn === 'google' ? '1px solid #000;' : '0')};
  border-radius: 64px;
  /* color: #ff5036; */
  margin-top: 10px;
  cursor: pointer;
`;

//로그아웃 버튼
const ButtonLogout = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  font-weight: 700;
  color: #ff5036;
  border: 1px solid #ff5036;
  border-radius: 64px;
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: white;
  cursor: pointer;
`;
//인풋 랩
const InputWrap = styled.div`
  display: flex;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e2e0e0;
  &:focus-within {
    border: 1px solid #ff5036;
  }
`;

//인풋 - 입력창
const Input = styled.input`
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  width: 100%;
  outline: none;
  border: none;
  height: 17px;
  &::placeholder {
    color: #9999;
    font-weight: normal;
  }
`;

export default LoginPage;
