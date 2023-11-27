import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { emailChage, passwordChage, passwordCheckChage, signupEvent } from '../redux/modules/signup';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const signup = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef('');

  useEffect(()=>{
    emailRef.current.focus()
  },[])


  const emailHandler = (e) => {
    dispatch(emailChage(e.target.value));
  };
  const passwordHandler = (e) => {
    dispatch(passwordChage(e.target.value));
  };
  const passwordCheckHandler = (e) => {
    dispatch(passwordCheckChage(e.target.value));
  };
  const sinupHandler = (event) => {
    dispatch(
      signupEvent({ navigate, email: signup.email, password: signup.password, passwordCheck: signup.passwordCheck })
    );
  };

  return (
    <StSignupWrap>
      <StSignupContainer>
        <StSignuptitle $title="title1">회원가입</StSignuptitle>
        <StSignuptitle $title="title2">펫스타그램에 온것을 환영합니다. </StSignuptitle>
        <StSignupBox>
          <StSignupBoxTitle>Sign up for a free account</StSignupBoxTitle>
          {/* 이메일 */}
          <StErrMsg>{signup.emailErrMsg}</StErrMsg>
          <StSignupBoxInput
            value={signup.email}
            onChange={emailHandler}
            ref={emailRef}
            onKeyUp={(e) => {
              if (e.key === 'Enter') sinupHandler();
            }}
            placeholder="Email address"
            type="email"
          />
          {/* 페스워드 */}
          <StErrMsg>{signup.passwordErrMsg}</StErrMsg>
          <StSignupBoxInput
            value={signup.password}
            onChange={passwordHandler}
            onKeyUp={(e) => {
              if (e.key === 'Enter') sinupHandler();
            }}
            placeholder="Create password"
            type="password"
          />
          {/* 페스워드확인 */}
          <StErrMsg>{signup.passwordCheckErrMsg}</StErrMsg>
          <StSignupBoxInput
            value={signup.passwordCheck}
            onChange={passwordCheckHandler}
            onKeyUp={(e) => {
              if (e.key === 'Enter') sinupHandler();
            }}
            placeholder="Create password comfim"
            type="password"
          />
          <StSignupBoxButton onClick={sinupHandler}>회원가입</StSignupBoxButton>
        </StSignupBox>
      </StSignupContainer>
    </StSignupWrap>
  );
}

export default Signup;

const StSignupWrap = styled.div`
  width: 100%;
  height: 100vh;
`;

const StSignupContainer = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StSignuptitle = styled.div`
  font-size: ${({ $title }) => ($title === 'title1' ? '4rem' : '3rem')};
  font-weight: 400;
  margin-bottom: ${({ $title }) => ($title === 'title1' ? '4rem' : '8rem')};
`;

const StSignupBox = styled.div`
  width: 60%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #000;
`;

const StSignupBoxTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-left: 11.5%;
  margin-bottom: 8%;
`;
const StSignupBoxInput = styled.input`
  width: 74%;
  font-size: 1.5rem;
  padding: 1.5%;
  margin-left: 11.5%;
  transition: 0.2s;
  margin-bottom: 3%;
  border: 1px solid #555;
  border-radius: 7px;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 0 #333;
    border: 0;
  }
`;
const StErrMsg = styled.p`
  width: 74%;
  height: 2%;
  margin: 1% 11.5%;
  color: #f00;
`;
const StSignupBoxButton = styled.button`
  width: 22%;
  font-size: 1.5rem;
  padding: 1.5%;
  margin-left: 11.5%;
  margin-top: 2%;
  margin-bottom: 5%;
  color: #fff;
  background-color: #ff5036;
  border: 0;
  border-radius: 7px;
  cursor: pointer;
  transition: 0.1s;
  font-weight: 500;
  &:hover {
    background-color: #fff;
    border: 1px solid #ff5036;
    color: #ff5036;
  }
`;
