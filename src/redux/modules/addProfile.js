import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../fireBase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment/moment';

const PROFILE_IMG_URL_CHAGE = 'PROFILE_IMG_URL_CHAGE';
const PROFILE_IMG_CHAGE = 'PROFILE_IMG_CHAGE';
const PROFILE_NAME_CHAGE = 'PROFILE_NAME_CHAGE';
const PROFILE_INTRODUCTION_CHAGE = 'PROFILE_INTRODUCTION_CHAGE';
const PROFILE_INTERESTS_TEXT_CHAGE = 'PROFILE_INTERESTS_TEXT_CHAGE';
const PROFILE_INTERESTS_INSERT = 'PROFILE_INTERESTS_INSERT';
const PROFILE_INTERESTS_REMOVE = 'PROFILE_INTERESTS_REMOVE';
const PROFILE_ADD_COMMIT = 'PROFILE_ADD_COMMIT';
const PROFILE_EDIT_COMMIT = 'PROFILE_EDIT_COMMIT'

// 프로필 이미지 URL 바꾸는 action
export const profileImgURLChage = (payload) => {
  return {
    type: PROFILE_IMG_URL_CHAGE,
    payload
  };
};

// 프로필 이미지 파일을 담는 action
export const profileImgChage = (payload) => {
  return {
    type: PROFILE_IMG_CHAGE,
    payload
  };
};

// 프로필 이름을 저장하는 action
export const profilenameChage = (payload) => {
  return {
    type: PROFILE_NAME_CHAGE,
    payload
  };
};

// 프로필 한줄소개를 저장하는 action
export const profileIntroductionChage = (payload) => {
  return {
    type: PROFILE_INTRODUCTION_CHAGE,
    payload
  };
};

// 프로필 관심사텍스트를 저장하는 action
export const profileInterestsTextChage = (payload) => {
  return {
    type: PROFILE_INTERESTS_TEXT_CHAGE,
    payload
  };
};

// 프로필 관심사 텍스트에 저장된 텍스트를 배열로 저장하는 action
export const profileInterestsInsert = (payload) => {
  return {
    type: PROFILE_INTERESTS_INSERT,
    payload
  };
};

// 프로필 관심사를 삭제하는 action
export const profileInterestsRemove = (payload) => {
  return {
    type: PROFILE_INTERESTS_REMOVE,
    payload
  };
};

export const profileAddCommit = (payload) => {
  return {
    type: PROFILE_ADD_COMMIT,
    payload
  };
};

export const profileEditCommit = (payload) => {
  return {
    type: PROFILE_EDIT_COMMIT,
    payload
  };
};

const initialState = {
  profileimgURL: 'https://picpac.kr/common/img/default_profile.png', // 프로필이미지 URL
  profileimg: '', // 프로필 이미지 파일
  profilename: '', // 프로필 이름
  profileIntroduction: '', // 프로필 한줄소개
  profileInterestsText: '', // 프로필 관심사 택스트 저장
  profileInterests: [], // 프로필 관심사 배열로 저장
  profileInterestsMsg: '', // 프로필 관심사 에러 메시지
  profileNameMsg: '', // 프로필 이름 에러 메시지
  profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
  profileimgMsg: '', // 프로필 관심사 이미지 메시지
  follower: [] // 팔로워
};

const addprofile = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_IMG_URL_CHAGE:
      return {
        ...state,
        profileimgURL: action.payload
      };
    case PROFILE_IMG_CHAGE:
      return {
        ...state,
        profileimg: action.payload
      };
    case PROFILE_NAME_CHAGE:
      return {
        ...state,
        profilename: action.payload
      };
    case PROFILE_INTRODUCTION_CHAGE:
      return {
        ...state,
        profileIntroduction: action.payload
      };
    case PROFILE_INTERESTS_TEXT_CHAGE:
      return {
        ...state,
        profileInterestsText: action.payload
      };
    case PROFILE_INTERESTS_INSERT:
      if (state.profileInterestsText === '') {
        return {
          ...state,
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileInterestsMsg: '관심사를 입력해 주세요'
        };
      } else if (state.profileInterestsText.length > 5) {
        return {
          ...state,
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileInterestsMsg: '관심사는 5글자 이하로 작성해 주세요'
        };
      } else if (state.profileInterests.length >= 5) {
        return {
          ...state,
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileInterestsMsg: '관심사는 5개 까지 작성할 수 있습니다. '
        };
      } else {
        let addInterests = state.profileInterests;
        addInterests.unshift(state.profileInterestsText);
        return {
          ...state,
          profileInterestsText: '',
          profileInterests: addInterests,
          profileInterestsMsg: '',
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '' // 프로필 관심사 이미지 메시지
        };
      }
    case PROFILE_INTERESTS_REMOVE:
      let removeInterests = state.profileInterests;
      removeInterests.splice(action.payload, 1);
      return {
        ...state,
        profileInterests: removeInterests
      };
    case PROFILE_ADD_COMMIT:
      if (state.profileimg.length === 0) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '이미지를 등록해 주세요.'
        };
      } else if (state.profilename === '') {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileNameMsg: '이름이 입력되지 않았습니다.'
        };
      } else if (state.profilename.length > 10) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileNameMsg: '이름은 10글자 이내로 작성해 주세요.'
        };
      } else if (state.profileIntroduction === '') {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileIntroductionMsg: '한줄소개가 입력되지 않았습니다.'
        };
      } else if (state.profileIntroduction.length > 15) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileIntroductionMsg: '한줄소개는 15글자 이내로 작성해 주세요.'
        };
      } else if (state.profileInterests.length === 0) {
        return {
          ...state,
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileInterestsMsg: '관심사를 입력해 주세요'
        };
      } else {
        const handleUpload = async () => {
          try {
            // 스토리지에 이미지 저장
            const imageRef = ref(
              storage,
              `${action.payload.id}/${moment().format('YYYYMMDDHHMMSS')}/${state.profileimg.name}`
            );
            await uploadBytes(imageRef, state.profileimg);
            const downloadURL = await getDownloadURL(imageRef);
            // 스토리지에 이미지 저장 후 firestore에 데이터 저장(이미지 url을 저장하기 위해서 )
            const addProfile = async () => {
              try {
                action.payload.e.preventDefault();
                const newProfile = {
                  profileimgURL: downloadURL, // 프로필 이미지 파일
                  profilename: state.profilename, // 프로필 이름
                  profileIntroduction: state.profileIntroduction, // 프로필 한줄소개
                  profileInterests: state.profileInterests // 프로필 관심사 배열로 저장
                };
                await setDoc(doc(db, 'users', `${action.payload.id}`), newProfile);
                action.payload.navigate('/');
              } catch (error) {
                console.error(error);
              }
            };
            addProfile();
          } catch (error) {
            console.error(error);
          }
        };
        handleUpload();
        return {
          ...state,
          profileimgURL: 'https://picpac.kr/common/img/default_profile.png', // 프로필이미지 URL
          profileimg: '', // 프로필 이미지 파일
          profilename: '', // 프로필 이름
          profileIntroduction: '', // 프로필 한줄소개
          profileInterestsText: '', // 프로필 관심사 택스트 저장
          profileInterests: [], // 프로필 관심사 배열로 저장
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '' // 프로필 관심사 이미지 메시지
        };
      }
    case PROFILE_EDIT_COMMIT:
      if (state.profileimg.length === 0) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '이미지를 등록해 주세요.'
        };
      } else if (state.profilename === '') {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileNameMsg: '이름이 입력되지 않았습니다.'
        };
      } else if (state.profilename.length > 10) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileNameMsg: '이름은 10글자 이내로 작성해 주세요.'
        };
      } else if (state.profileIntroduction === '') {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileIntroductionMsg: '한줄소개가 입력되지 않았습니다.'
        };
      } else if (state.profileIntroduction.length > 15) {
        return {
          ...state,
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileIntroductionMsg: '한줄소개는 15글자 이내로 작성해 주세요.'
        };
      } else if (state.profileInterests.length === 0) {
        return {
          ...state,
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          profileInterestsMsg: '관심사를 입력해 주세요'
        };
      } else {
        const handleUpload = async () => {
          try {
            // 스토리지에 이미지 저장
            const imageRef = ref(
              storage,
              `${action.payload.id}/${moment().format('YYYYMMDDHHMMSS')}/${state.profileimg.name}`
            );
            await uploadBytes(imageRef, state.profileimg);
            const downloadURL = await getDownloadURL(imageRef);

            // 스토리지에 이미지 저장 후 firestore에 데이터 저장(이미지 url을 저장하기 위해서 )
            const editProfile = async () => {
              try {
                action.payload.e.preventDefault();
                const editProfile = {
                  profileimgURL: downloadURL, // 프로필 이미지 파일
                  profilename: state.profilename, // 프로필 이름
                  profileIntroduction: state.profileIntroduction, // 프로필 한줄소개
                  profileInterests: state.profileInterests // 프로필 관심사 배열로 저장
                };
                await updateDoc(doc(db, 'users', `${action.payload.id}`), editProfile);
                action.payload.navigate('/');
              } catch (error) {
                console.error(error);
              }
            };
            editProfile();
          } catch (error) {
            console.error(error);
          }
        };
        handleUpload();
        return {
          ...state,
          profileimgURL: 'https://picpac.kr/common/img/default_profile.png', // 프로필이미지 URL
          profileimg: '', // 프로필 이미지 파일
          profilename: '', // 프로필 이름
          profileIntroduction: '', // 프로필 한줄소개
          profileInterestsText: '', // 프로필 관심사 택스트 저장
          profileInterests: [], // 프로필 관심사 배열로 저장
          profileInterestsMsg: '', // 프로필 관심사 에러 메시지
          profileNameMsg: '', // 프로필 이름 에러 메시지
          profileIntroductionMsg: '', // 프로필 한줄소개 에러 메시지
          profileimgMsg: '', // 프로필 관심사 이미지 메시지
          follower: []
        };
      }

    default:
      return state;
      break;
  }
};

export default addprofile;
