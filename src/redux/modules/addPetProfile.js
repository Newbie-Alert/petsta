const PET_DATA_READ = 'PET_DATA_READ';
const Add_PET_MODAL = 'Add_PET_MODAL';
const PET_IMG_URL_CHAGE = 'PET_IMG_URL_CHAGE';
const PET_IMG_CHAGE = 'PET_IMG_CHAGE';
const PET_NAME_CHAGE = 'PET_NAME_CHAGE';
const PET_AGE_CHAGE = 'PET_AGE_CHAGE';
const PET_INTRODUCTION_CHAGE = 'PET_INTRODUCTION_CHAGE';
const PET_GANDER_CHAGE = 'PET_GANDER_CHAGE';
const PET_KINDS_CHAGE = 'PET_KINDS_CHAGE';
const PET_LIKE_TEXT_CHAGE = 'PET_LIKE_TEXT_CHAGE';
const PET_LIKE_INSERT = 'PET_LIKE_INSERT';
const PET_LIKE_REMOVE = 'PET_LIKE_REMOVE';
const PET_DISLIKE_TEXT_CHAGE = 'PET_DISLIKE_TEXT_CHAGE';
const PET_DISLIKE_INSERT = 'PET_DISLIKE_INSERT';
const PET_DISLIKE_REMOVE = 'PET_DISLIKE_REMOVE';
const ADD_PET_COMMIT = 'ADD_PET_COMMIT';

// 펫데이터를 저장하는 action
export const pedtDataRead = (payload) => {
  return {
    type: PET_DATA_READ,
    payload
  };
};
// 모달을 보여줄지 말지 결정하는 action
export const addPetModal = (payload) => {
  return {
    type: Add_PET_MODAL,
    payload
  };
};
// 펫 이미지 URL 바꾸는 action
export const petImgURLChage = (payload) => {
  return {
    type: PET_IMG_URL_CHAGE,
    payload
  };
};
// 펫 이미지 파일을 담는 action
export const petImgChage = (payload) => {
  return {
    type: PET_IMG_CHAGE,
    payload
  };
};
// 펫 이름을 저장하는 action
export const petnameChage = (payload) => {
  return {
    type: PET_NAME_CHAGE,
    payload
  };
};
// 펫 나이을 저장하는 action
export const petAgeChage = (payload) => {
  return {
    type: PET_AGE_CHAGE,
    payload
  };
};
// 펫 한줄소개를 저장하는 action
export const petIntroductionChage = (payload) => {
  return {
    type: PET_INTRODUCTION_CHAGE,
    payload
  };
};
// 펫 성별 저장하는 action
export const petGanderChage = (payload) => {
  return {
    type: PET_GANDER_CHAGE,
    payload
  };
};
// 펫 종류 저장하는 action
export const petKindsChage = (payload) => {
  return {
    type: PET_KINDS_CHAGE,
    payload
  };
};
// 펫 좋아하는것택스트 저장하는 action
export const petLikeTextChage = (payload) => {
  return {
    type: PET_LIKE_TEXT_CHAGE,
    payload
  };
};
// 펫 좋아하는것 텍스트에 저장된 텍스트를 배열로 저장하는 action
export const petLikeInsert = (payload) => {
  return {
    type: PET_LIKE_INSERT,
    payload
  };
};
// 펫 좋아하는것을 삭제하는 action
export const petLikeRemove = (payload) => {
  return {
    type: PET_LIKE_REMOVE,
    payload
  };
};
// 펫 싫어하는것택스트 저장하는 action
export const petDisLikeTextChage = (payload) => {
  return {
    type: PET_DISLIKE_TEXT_CHAGE,
    payload
  };
};
// 펫 싫어하는것 텍스트에 저장된 텍스트를 배열로 저장하는 action
export const petDisLikeInsert = (payload) => {
  return {
    type: PET_DISLIKE_INSERT,
    payload
  };
};
// 펫 싫어하는것을 삭제하는 action
export const petDisLikeRemove = (payload) => {
  return {
    type: PET_DISLIKE_REMOVE,
    payload
  };
};
// 펫정보를 파이어 배이스에 추가하는 action
export const addPetCommit = (payload) => {
  return {
    type: ADD_PET_COMMIT,
    payload
  };
};

const initialState = {
  petData: [], // 펫의 데이터를 보관하는 배열
  addModal: false, // 모달을 보여줄지 말지 결정하는 boolean
  petimgURL: 'https://picpac.kr/common/img/default_profile.png', // 프로필이미지 URL
  petimg: '', // 펫 이미지 파일
  petname: '', // 펫 이름
  petAge: '', // 펫 skdl
  petIntroduction: '', // 펫 한줄소개
  petGender: '', // 펫 성별
  petKinds: '', // 펫 종류
  petLikeText: '', // 펫 좋아하는것 택스트 저장
  petLike: [], // 펫 좋아하는것 배열로 저장
  petLikeMsg: '', // 펫 좋아하는것 에러 메시지
  petDisLikeText: '', // 펫 싫어하는것 택스트 저장
  petDisLike: [], // 펫 싫어하는것 배열로 저장
  petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
  petimgMsg: '', // 펫 이미지 에러 메시지
  petNameMsg: '', // 펫 이름 에러 메시지
  petIntroductionMsg: '', // 펫 소개 에러 메시지
  petKindsMsg: '' // 펫 종류 에러 메시지
};

const addPetProfile = (state = initialState, action) => {
  switch (action.type) {
    case PET_DATA_READ:
      return {
        ...state,
        petData: action.payload
      };
    case Add_PET_MODAL:
      return {
        ...state,
        addModal: !state.addModal
      };
    case PET_IMG_URL_CHAGE:
      return {
        ...state,
        petimgURL: action.payload
      };
    case PET_IMG_CHAGE:
      return {
        ...state,
        petimg: action.payload
      };

    case PET_NAME_CHAGE:
      return {
        ...state,
        petname: action.payload
      };
    case PET_AGE_CHAGE:
      return {
        ...state,
        petAge: action.payload
      };
    case PET_INTRODUCTION_CHAGE:
      return {
        ...state,
        petIntroduction: action.payload
      };
    case PET_GANDER_CHAGE:
      return {
        ...state,
        petGender: action.payload
      };
    case PET_KINDS_CHAGE:
      return {
        ...state,
        petKinds: action.payload
      };

    case PET_LIKE_TEXT_CHAGE:
      return {
        ...state,
        petLikeText: action.payload
      };
    case PET_LIKE_INSERT:
      if (state.petLikeText === '') {
        return {
          ...state,
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petLikeMsg: '좋아하는것을 입력해 주세요'
        };
      } else if (state.petLikeText.length > 5) {
        return {
          ...state,
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petLikeMsg: '좋아하는것은 5글자 이하로 작성해 주세요'
        };
      } else if (state.petLike.length >= 5) {
        return {
          ...state,
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petLikeMsg: '좋아하는것은 5개 까지 작성할 수 있습니다. '
        };
      } else {
        let addPetLike = state.petLike;
        addPetLike.unshift(state.petLikeText);
        return {
          ...state,
          petLikeText: '',
          petLike: addPetLike,
          petLikeMsg: ''
        };
      }
    case PET_LIKE_REMOVE:
      let removePetLike = state.petLike;
      removePetLike.splice(action.payload, 1);
      return {
        ...state,
        petLike: removePetLike
      };

    case PET_DISLIKE_TEXT_CHAGE:
      return {
        ...state,
        petDisLikeText: action.payload
      };
    case PET_DISLIKE_INSERT:
      if (state.petDisLikeText === '') {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petDisLikeMsg: '싫어하는것을 입력해 주세요'
        };
      } else if (state.petDisLikeText.length > 5) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petDisLikeMsg: '싫어하는것은 5글자 이하로 작성해 주세요'
        };
      } else if (state.petDisLike.length >= 5) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지

          petDisLikeMsg: '싫어하는것은 5개 까지 작성할 수 있습니다. '
        };
      } else {
        let addPetDisLike = state.petDisLike;
        addPetDisLike.unshift(state.petDisLikeText);
        return {
          ...state,
          petDisLikeText: '',
          petDisLike: addPetDisLike,
          petDisLikeMsg: ''
        };
      }
    case PET_DISLIKE_REMOVE:
      let removePetDisLike = state.petDisLike;
      removePetDisLike.splice(action.payload, 1);
      return {
        ...state,
        petDisLike: removePetDisLike
      };
    case ADD_PET_COMMIT:
      if (state.petimg.length === 0) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petimgMsg: '이미지를 등록헤 주세요'
        };
      } else if (state.petname === '') {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petNameMsg: '펫의 이름을 입력해 주세요'
        };
      } else if (state.petname.length > 10) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petNameMsg: '펫의 이름은 10글자 이하로 작성해 주세요'
        };
      } else if (state.petGender === '') {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petNameMsg: '성별을 정해주세요'
        };
      } else if (state.petIntroduction === '') {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petIntroductionMsg: '한줄소개를 입력해 주세요'
        };
      } else if (state.petIntroduction.length > 15) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petIntroductionMsg: '한줄소개는 50글자 이하로 작성해 주세요'
        };
      } else if (state.petKinds === '') {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '펫의 종류를 알려주세요'
        };
      } else if (state.petLike.length === 0) {
        return {
          ...state,
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petLikeMsg: '좋아하는것이 없습니다.'
        };
      } else if (state.petDisLike.length === 0) {
        return {
          ...state,
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '',// 펫 종류 에러 메시지
          petDisLikeMsg: '싫어하는것이 없습니다.'
        };
      } else {
        action.payload.adddCommit(action.payload.e);
        return {
          addModal: !state.addModal, // 모달을 보여줄지 말지 결정하는 boolean
          petimgURL: 'https://picpac.kr/common/img/default_profile.png', // 프로필이미지 URL
          petimg: '', // 펫 이미지 파일
          petname: '', // 펫 이름
          petAge: '', // 펫 skdl
          petIntroduction: '', // 펫 한줄소개
          petGender: '', // 펫 성별
          petKinds: '', // 펫 종류
          petLikeText: '', // 펫 좋아하는것 택스트 저장
          petLike: [], // 펫 좋아하는것 배열로 저장
          petLikeMsg: '', // 펫 좋아하는것 에러 메시지
          petDisLikeText: '', // 펫 싫어하는것 택스트 저장
          petDisLike: [], // 펫 싫어하는것 배열로 저장
          petDisLikeMsg: '', // 펫 싫어하는것 에러 메시지
          petimgMsg: '', // 펫 이미지 에러 메시지
          petNameMsg: '', // 펫 이름 에러 메시지
          petIntroductionMsg: '', // 펫 소개 에러 메시지
          petKindsMsg: '' // 펫 종류 에러 메시지
        };
      }
    default:
      return state;
      break;
  }
};

export default addPetProfile;
