import React, { useRef } from 'react';
import styled from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPetModal,
  petImgURLChage,
  petImgChage,
  petnameChage,
  petAgeChage,
  petIntroductionChage,
  petLikeTextChage,
  petLikeInsert,
  petLikeRemove,
  petDisLikeTextChage,
  petDisLikeInsert,
  petDisLikeRemove,
  petGanderChage,
  petKindsChage,
  addPetCommit,
  pedtDataRead
} from '../../redux/modules/addPetProfile';
import { useParams } from 'react-router-dom';
import { db, storage } from '../../fireBase';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import moment from 'moment/moment';

function PetAdd() {
  const addPetProfile = useSelector((state) => state.addPetProfile);
  const dispatch = useDispatch();
  const AddfileRef = useRef(null);
  const kindRef = useRef(null);
  const kindInputRef = useRef(null);
  const { id } = useParams();

  const handleUpload = async (e) => {
    try {
      // 스토리지에 이미지 저장
      const imageRef = ref(storage, `${id}/${moment().format('YYYYMMDDHHMMSS')}/${addPetProfile.petimg.name}`);
      await uploadBytes(imageRef, addPetProfile.petimg);
      const downloadURL = await getDownloadURL(imageRef);
      // 스토리지에 이미지 저장 후 firestore에 데이터 저장(이미지 url을 저장하기 위해서 )
      const addPet = async (e) => {
        try {
          e.preventDefault();
          const newPet = {
            masterId: id, // 주인 아이디
            petimgURL: downloadURL, // 펫 이미지 파일
            petname: addPetProfile.petname, // 펫 이름
            petAge: addPetProfile.petAge, // 펫 나이
            petIntroduction: addPetProfile.petIntroduction, // 펫 한줄소개
            petGender: addPetProfile.petGender, // 펫 성별
            petKinds: addPetProfile.petKinds, // 펫 종류
            petLike: addPetProfile.petLike, // 펫 좋아하는것 배열로 저장
            petDisLike: addPetProfile.petDisLike, // 펫 싫어하는것 배열로 저장
            createdAt: moment().format('YYYY-MM-DD-HH:MM:SS') // 저장한 날짜
          };
          const collectionRef = collection(db, 'myPet');
          await addDoc(collectionRef, newPet);
          // firestote에 데이터 저장 후 데이터 읽기
          // 데이터 읽은 후 읽은 데이터를 dispatch로 보내기
          const fetchData = async () => {
            const q = query(collection(db, 'myPet'));
            const querySnapshot = await getDocs(q);

            const initialPets = [];

            querySnapshot.forEach((doc) => {
              initialPets.push({ petId: doc.id, ...doc.data() });
            });
            const filterData = initialPets.filter((x) => x.masterId === id);
            dispatch(pedtDataRead(filterData));
          };
          fetchData();
        } catch (error) {
          console.error(error);
        }
      };
      addPet(e);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    AddfileRef?.current?.click();
  };
  const kindClick = () => {
    kindInputRef?.current?.focus();
  };
  const kindInputClick = () => {
    kindRef?.current?.click();
  };
  const petNameHandler = (e) => {
    dispatch(petnameChage(e.target.value));
  };
  const petAgeHandler = (e) => {
    dispatch(petAgeChage(e.target.value));
  };
  const petGengerHandler = (e) => {
    dispatch(petGanderChage(e.target.value));
  };
  const petKindHandler = (e) => {
    dispatch(petKindsChage(e.target.value));
  };
  const petIntroductionHandler = (e) => {
    dispatch(petIntroductionChage(e.target.value));
  };
  const petImgHandler = (e) => {
    dispatch(petImgChage(e.target.files[0]));
    let reader = new FileReader();
    reader.onload = (data) => {
      dispatch(petImgURLChage(data.target.result));
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const petLikeTextHandler = (e) => {
    dispatch(petLikeTextChage(e.target.value));
  };
  const petLikeHandler = (e) => {
    dispatch(petLikeInsert(e.target.value));
  };
  const petLikeRemoveHandler = (index) => {
    dispatch(petLikeRemove(index));
  };
  const petDisLikeTextHandler = (e) => {
    dispatch(petDisLikeTextChage(e.target.value));
  };
  const petDisLikeHandler = (e) => {
    dispatch(petDisLikeInsert(e.target.value));
  };
  const petDisLikeRemoveHandler = (index) => {
    dispatch(petDisLikeRemove(index));
  };
  const addPetCommitHandler = (id, e) => {
    dispatch(addPetCommit({ id, e, adddCommit: handleUpload }));
  };
  const addPetModalHandler = () => {
    dispatch(addPetModal());
  };
  return (
    <StPetAddModalWrap>
      <StModalBG />
      <StAddBox>
        <StPorfileImgBox>
          <StPorfileImg src={addPetProfile.petimgURL} alt="" />
          <StAddFile type="file" multiple accept="image/*" onChange={petImgHandler} ref={AddfileRef} />
          <StPorfileAddBtn onClick={handleClick}>
            <FontAwesomeIcon icon={faPlus} />
          </StPorfileAddBtn>
          <StErrMsg $nsg="img">{addPetProfile.petimgMsg}</StErrMsg>
        </StPorfileImgBox>
        <StPorfilecontentBox>
          <StPetInuptBox>
            <StPetTitle>이름</StPetTitle>
            <StPetInput
              type="text"
              $input="name"
              placeholder="반려동물 이름을 알려주세요"
              onChange={petNameHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addPetCommitHandler();
              }}
            />
            <StPetInuptLabel $radio="petGander">
              <StPetInuptRadio type="radio" name="petGander" value="암컷" onClick={petGengerHandler} />
              <StPetRadioTitle>암컷</StPetRadioTitle>
            </StPetInuptLabel>
            <StPetInuptLabel $radio="petGander">
              <StPetInuptRadio type="radio" name="petGander" value="수컷" onClick={petGengerHandler} />
              <StPetRadioTitle>수컷</StPetRadioTitle>
            </StPetInuptLabel>
          </StPetInuptBox>
          <StErrMsg $nsg="nameAndso">{addPetProfile.petNameMsg}</StErrMsg>
          <StPetInuptBox>
            <StPetTitle>한줄소개</StPetTitle>
            <StPetInput
              type="text"
              $input="name"
              placeholder="반려동물을 소개해 주세요"
              onChange={petIntroductionHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addPetCommitHandler();
              }}
            />
            <StPetTitle $input="age">나이</StPetTitle>
            <StPetInput
              type="number"
              onChange={petAgeHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addPetCommitHandler();
              }}
            />
          </StPetInuptBox>
          <StErrMsg $nsg="nameAndso">{addPetProfile.petIntroductionMsg}</StErrMsg>
          <StPetInuptBox>
            <StPetInuptLabel>
              <StPetInuptRadio type="radio" name="pet" value="강아지" onClick={petKindHandler} />{' '}
              <StPetRadioTitle>강아지</StPetRadioTitle>
            </StPetInuptLabel>
            <StPetInuptLabel>
              <StPetInuptRadio type="radio" name="pet" value="고양이" onClick={petKindHandler} />{' '}
              <StPetRadioTitle>고양이</StPetRadioTitle>
            </StPetInuptLabel>
            <StPetInuptLabel>
              <StPetInuptRadio type="radio" name="pet" value="기타" ref={kindRef} onClick={kindClick} />{' '}
              <StPetRadioTitle>기타</StPetRadioTitle>
            </StPetInuptLabel>
            <StPetInput
              $input="radio"
              placeholder="반려동물을 선택해 주세요"
              type="text"
              onChange={petKindHandler}
              ref={kindInputRef}
              onClick={kindInputClick}
              onKeyUp={(e) => {
                if (e.key === 'Enter') addPetCommitHandler();
              }}
            />
          </StPetInuptBox>
          <StErrMsg $nsg="kind">{addPetProfile.petKindsMsg}</StErrMsg>
          <StLikeAndDisLikeWrap>
            <StLikeAndDisLikeBox>
              <StLikeAndDisLikeInputBox>
                <StLikeAndDisLikeInput
                  type="text"
                  placeholder="좋아하는것"
                  value={addPetProfile.petLikeText}
                  onChange={petLikeTextHandler}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') petLikeHandler();
                  }}
                />
                <StLikeAndDisLikeBtn onClick={petLikeHandler}>등록</StLikeAndDisLikeBtn>
              </StLikeAndDisLikeInputBox>
              <StErrMsg>{addPetProfile.petLikeMsg}</StErrMsg>
              <StLikeAndDisLikeUl>
                {addPetProfile.petLike.map((item, index) => {
                  return (
                    <StLikeAndDisLikeLi
                      onClick={() => {
                        petLikeRemoveHandler(index);
                      }}
                      $text={item}
                      key={index}
                    />
                  );
                })}
              </StLikeAndDisLikeUl>
            </StLikeAndDisLikeBox>
            <StLikeAndDisLikeBox>
              <StLikeAndDisLikeInputBox>
                <StLikeAndDisLikeInput
                  type="text"
                  placeholder="싫어하는것"
                  value={addPetProfile.petDisLikeText}
                  onChange={petDisLikeTextHandler}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') petDisLikeHandler();
                  }}
                />
                <StLikeAndDisLikeBtn onClick={petDisLikeHandler}>등록</StLikeAndDisLikeBtn>
              </StLikeAndDisLikeInputBox>
              <StErrMsg>{addPetProfile.petDisLikeMsg}</StErrMsg>
              <StLikeAndDisLikeUl>
                {addPetProfile.petDisLike.map((item, index) => {
                  return (
                    <StLikeAndDisLikeLi
                      $text={item}
                      key={index}
                      onClick={() => {
                        petDisLikeRemoveHandler(index);
                      }}
                    />
                  );
                })}
              </StLikeAndDisLikeUl>
            </StLikeAndDisLikeBox>
          </StLikeAndDisLikeWrap>
          <StPetInuptBox $button="addBtn">
            <StAddBtn
              onClick={(e) => {
                addPetCommitHandler(id, e);
              }}
            >
              등록
            </StAddBtn>
            <StAddBtn onClick={addPetModalHandler}>닫기</StAddBtn>
          </StPetInuptBox>
        </StPorfilecontentBox>
      </StAddBox>
    </StPetAddModalWrap>
  );
}

export default PetAdd;

const StPetAddModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 99;
`;
const StModalBG = styled.div`
  z-index: 100;
  width: 100%;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
  position: fixed;
`;

const StAddBox = styled.div`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 101;
  width: 50%;
  height: 50%;
  display: flex;
  box-shadow: 0 0 10px 0 #333;
  border-radius: 5px;
`;
const StPorfileImgBox = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StPorfileImg = styled.img`
  width: 50%;
  border-radius: 50%;
`;
const StAddFile = styled.input`
  display: none;
`;
const StPorfileAddBtn = styled.div`
  position: absolute;
  right: 23%;
  bottom: 35%;
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  background-color: #fff;
  border-radius: 50px;
  box-sizing: border-box;
  border-radius: 50%;
  color: #ff5036;
  border: 2px solid #ff5036;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    border: 0;
    background-color: #ff5036;
    color: #fff;
  }
`;
const StPorfilecontentBox = styled.div`
  flex: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StPetInuptBox = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: ${({ $button }) => ($button === 'addBtn' ? 'flex-end' : 'space-between')};
  align-items: center;
`;
const StPetTitle = styled.div`
  width: ${({ $input }) => ($input === 'age' ? '10%' : '30%')};
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.5rem;
`;

const StPetInput = styled.input`
  width: ${({ $input }) => ($input === 'radio' ? '40%' : $input === 'name' ? '45%' : '10%')};
  font-size: 1.5rem;
  padding: 1%;
  margin-right: ${({ $input }) => ($input === 'name' ? '5%' : '0')};
  border: 0;
  border-bottom: 1px solid #000;
  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;

const StPetInuptLabel = styled.label`
  width: ${({ $radio }) => ($radio === 'petGander' ? '10%' : '14%')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StPetInuptRadio = styled.input`
  appearance: none;
  margin: 0;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  &:checked {
    border: 0.4em solid #ff5036;
  }
  &:focus-visible {
    outline: max(2px, 0.1em) dotted #ff5036;
    outline-offset: max(2px, 0.1em);
  }
`;
const StPetRadioTitle = styled.span`
  font-size: 1.5rem;
  height: 100%;
`;

const StLikeAndDisLikeWrap = styled.div`
  width: 80%;
  height: 20%;
  display: flex;
  margin: 2% 0;
  justify-content: space-between;
`;

const StLikeAndDisLikeBox = styled.div`
  width: 47%;
  height: 100%;
`;

const StLikeAndDisLikeInputBox = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StLikeAndDisLikeInput = styled.input`
  width: 65%;
  font-size: 1.5rem;
  padding: 1%;
  border: 0;
  border-bottom: 1px solid #000;
  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;

const StLikeAndDisLikeBtn = styled.button`
  background-color: #ff5036;
  border: 0;
  color: #fff;
  border-radius: 7px;
  padding: 1% 5%;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5036;
    background-color: #fff;
    color: #ff5036;
  }
`;
const StLikeAndDisLikeUl = styled.ul`
  width: 100%;
  height: 95%;
  padding-top: 3%;
  &::after {
    clear: both;
    content: '';
    display: block;
    overflow: hidden;
  }
`;
const StLikeAndDisLikeLi = styled.li`
  float: left;
  margin: 1% 2%;
  font-size: 1rem;
  /* width: ${({ $text }) => `#${$text}rem`};
  height: 1rem; */
  width: ${({ $text }) => `${$text.length + 1}rem`};
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &::before {
    content: ${({ $text }) => `'#${$text}'`};
  }

  &:hover {
    animation-play-state: paused;
    color: #ff5036;
  }

  &:hover::before {
    content: '삭제';
  }
`;

const StErrMsg = styled.div`
  position: ${({ $nsg }) => ($nsg === 'img' ? 'absolute' : 'none')};
  top: 18%;
  left: 50%;
  transform: ${({ $nsg }) => ($nsg === 'img' ? 'translateX(-50%)' : 'translateX(0)')};
  width: ${({ $nsg }) => ($nsg === 'nameAndso' ? '57%' : $nsg === 'kind' ? '33%' : $nsg === 'img' ? 'auto' : '100%')};
  color: #f00;
  font-size: 0.8rem;
  height: ${({ $nsg }) => ($nsg === 'nameAndso' || $nsg === 'kind' ? '3%' : '30%')};
  margin-left: ${({ $nsg }) => ($nsg === 'nameAndso' ? '25%' : $nsg === 'kind' ? '46.5%' : '0')};
  margin-bottom: ${({ $nsg }) => ($nsg === 'nameAndso' ? '2%' : $nsg === 'kind' ? '2%' : '0%')};

  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StAddBtn = styled.button`
  background-color: #ff5036;
  border: 0;
  color: #fff;
  border-radius: 7px;
  padding: 1% 5%;
  font-size: 1.4rem;
  font-weight: bold;
  margin-left: 5%;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5036;
    background-color: #fff;
    color: #ff5036;
  }
`;
