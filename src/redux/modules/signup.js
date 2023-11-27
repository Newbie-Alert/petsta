import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireBase';

const EMAIL_CHAGE = 'EMAIL_CHAGE';
const PASSWORD_CHAGE = 'PASSWORD_CHAGE';
const PASSWORD_CHECK_CHAGE = 'PASSWORD_CHECK_CHAGE';
const SIGN_UP_EVENT = 'SIGN_UP_EVENT';

export const emailChage = (payload) => {
  return {
    type: EMAIL_CHAGE,
    payload
  };
};
export const passwordChage = (payload) => {
  return {
    type: PASSWORD_CHAGE,
    payload
  };
};
export const passwordCheckChage = (payload) => {
  return {
    type: PASSWORD_CHECK_CHAGE,
    payload
  };
};
export const signupEvent = (payload) => {
  return {
    type: SIGN_UP_EVENT,
    payload
  };
};

const initialState = {
  email: '',
  password: '',
  passwordCheck: '',
  emailErrMsg: '',
  passwordErrMsg: '',
  passwordCheckErrMsg: '',
  follower: []
};

const signup = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_CHAGE:
      return {
        ...state,
        email: action.payload
      };
    case PASSWORD_CHAGE:
      return {
        ...state,
        password: action.payload
      };
    case PASSWORD_CHECK_CHAGE:
      return {
        ...state,
        passwordCheck: action.payload
      };
    case SIGN_UP_EVENT:
      const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      const passwordReg = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      if (state.email === '') {
        return {
          ...state,
          emailErrMsg: '이메일이 입력되지 않았습니다.',
          passwordErrMsg: '',
          passwordCheckErrMsg: ''
        };
      } else if (!emailReg.test(state.email)) {
        return {
          ...state,
          emailErrMsg: '이메일 형식으로 입력해 주세요.',
          passwordErrMsg: '',
          passwordCheckErrMsg: ''
        };
      } else if (state.password === '') {
        return {
          ...state,
          emailErrMsg: '',
          passwordErrMsg: '비밀번호가 입력되지 않았습니다.',
          passwordCheckErrMsg: ''
        };
      } else if (!passwordReg.test(state.password)) {
        return {
          ...state,
          emailErrMsg: '',
          passwordErrMsg: '영문, 숫자, 특수문자(!@$%^*)조합 8자 이상으로 입력해 주세요.',
          passwordCheckErrMsg: ''
        };
      } else if (state.password !== state.passwordCheck) {
        return {
          ...state,
          emailErrMsg: '',
          passwordErrMsg: '',
          passwordCheckErrMsg: '비밀번호가 맞지 않습니다.'
        };
      } else {
        const signUp = async () => {
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, state.email, state.password);
            localStorage.setItem('Token', JSON.stringify(userCredential._tokenResponse));
            action.payload.navigate(`/addprofile/${userCredential.user.uid}`);
          } catch (error) {
            console.error(error);
          }
        };
        signUp();
        return {
          email: '',
          password: '',
          passwordCheck: '',
          emailErrMsg: '',
          passwordErrMsg: '',
          passwordCheckErrMsg: '',
          follower: []
        };
      }
    default:
      return state;
      break;
  }
};

export default signup;
