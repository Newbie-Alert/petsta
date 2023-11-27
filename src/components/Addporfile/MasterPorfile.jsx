import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  profilenameChage,
  profileIntroductionChage,
  profileInterestsTextChage,
  profileImgChage,
  profileImgURLChage,
  profileInterestsInsert,
  profileInterestsRemove,
  profileAddCommit
} from '../../redux/modules/addProfile';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useParams } from 'react-router-dom';

function MasterPorfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addprofile = useSelector((state) => state.addprofile);
  const dispatch = useDispatch();
  const AddfileRef = useRef(null);
  const handleClick = () => {
    AddfileRef?.current?.click();
  };

  const profilenameHandler = (e) => {
    dispatch(profilenameChage(e.target.value));
  };
  const profileIntroductionHandler = (e) => {
    dispatch(profileIntroductionChage(e.target.value));
  };
  const profileImgHandler = (e) => {
    dispatch(profileImgChage(e.target.files[0]));
    let reader = new FileReader();
    reader.onload = (data) => {
      dispatch(profileImgURLChage(data.target.result));
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const profileInterestsTextHandler = (e) => {
    dispatch(profileInterestsTextChage(e.target.value));
  };
  const profileInterestsHandler = (e) => {
    dispatch(profileInterestsInsert(e.target.value));
  };
  const profileInterestsRemoveHandler = (index) => {
    dispatch(profileInterestsRemove(index));
  };
  const profileAddHandler = (id, e, navigate) => {
    dispatch(profileAddCommit({ id, e, navigate }));
  };
  return (
    <StMasterPorfileWrap>
      <StPorfileImgBox>
        <StPorfileImg src={`${addprofile.profileimgURL}`} alt="" />
        <StAddFile type="file" multiple accept="image/*" onChange={profileImgHandler} ref={AddfileRef} />

        <StPorfileAddBtn onClick={handleClick}>
          <FontAwesomeIcon icon={faPlus} />
        </StPorfileAddBtn>
        <StErrMsg $input="img">{addprofile.profileimgMsg}</StErrMsg>
      </StPorfileImgBox>
      <StPorfilecontentBox>
        <StcontentBox>
          <StinputBox>
            <StInputTitie>이름</StInputTitie>
            <StcontentInput
              type="text"
              placeholder="이름을 입력하세요"
              value={addprofile.profilename}
              onChange={profilenameHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') profileAddHandler(id, e, navigate);
              }}
            />
          </StinputBox>
        </StcontentBox>
        <StErrMsg>{addprofile.profileNameMsg}</StErrMsg>
        <StcontentBox>
          <StinputBox>
            <StInputTitie>한줄소개</StInputTitie>
            <StcontentInput
              type="text"
              placeholder="한줄소개를 입력하세요"
              value={addprofile.profileIntroduction}
              onChange={profileIntroductionHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') profileAddHandler(id, e, navigate);
              }}
            />
          </StinputBox>
        </StcontentBox>
        <StErrMsg>{addprofile.profileIntroductionMsg}</StErrMsg>
        <StcontentBox>
          <StInput3box>
            <StInputTitie>관심사</StInputTitie>
            <StcontentInput
              type="text"
              $input="interests"
              placeholder="관심사를 입력하세요"
              value={addprofile.profileInterestsText}
              onChange={profileInterestsTextHandler}
              onKeyUp={(e) => {
                if (e.key === 'Enter') profileInterestsHandler(e);
              }}
            />
            <StInput3Button onClick={profileInterestsHandler}>등록</StInput3Button>
          </StInput3box>
          <StErrMsg $input="interests">{addprofile.profileInterestsMsg}</StErrMsg>
          <StInterestsBox>
            {addprofile.profileInterests.map((item, index) => (
              <StInterestsList
                onClick={() => {
                  profileInterestsRemoveHandler(index);
                }}
                $text={item}
                key={index}
              ></StInterestsList>
            ))}
          </StInterestsBox>
        </StcontentBox>
      </StPorfilecontentBox>
    </StMasterPorfileWrap>
  );
}

export default MasterPorfile;

const StMasterPorfileWrap = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  bottom: 26%;
  width: 4rem;
  height: 4rem;
  display: flex;
  transition: 0.1s;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  background-color: #fff;
  border-radius: 50px;
  box-sizing: border-box;
  border-radius: 50%;
  color: #ff5036;
  border: 2px solid #ff5036;
  cursor: pointer;
  &:hover {
    border: 0;
    background-color: #ff5036;
    color: #fff;
  }
`;

const StPorfilecontentBox = styled.div`
  flex: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StcontentBox = styled.div`
  width: 80%;
  height: auto;
  margin: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  &:nth-child(5) {
    height: 40%;
    align-items: flex-start;
  }
`;
const StinputBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const StInputTitie = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
`;
const StcontentInput = styled.input`
  width: ${({ $input }) => ($input === 'interests' ? '50%' : '70%')};
  font-size: 1.5rem;
  padding: 1%;
  border: 0;
  border-bottom: 1px solid #000;
  &:focus {
    outline: none;
    border-bottom: 2px solid #000;
  }
`;
const StInput3box = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StInput3Button = styled.button`
  width: 15%;
  font-size: 1.5rem;
  padding: 1% 0;
  margin-left: 5%;
  border-radius: 7px;
  border: 0;
  background-color: #ff5036;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #fff;
    border: 1px solid #ff5036;
    color: #ff5036;
  }
`;
const StErrMsg = styled.div`
  position: ${({ $input }) => ($input === 'img' ? 'absolute' : 'none')};
  top: 15%;
  left: 11%;
  color: #f00;
  width: 50%;
  margin-left: ${({ $input }) => ($input === 'interests' ? '30%' : '18%')};
  height: ${({ $input }) => ($input === 'interests' ? '7%' : '5%')};
  margin-top: 1%;
  font-size: 0.9rem;
  margin-bottom: 2%;
`;

const StInterestsBox = styled.ul`
  width: 100%;
  height: auto;
  &::after {
    clear: both;
    content: '';
    display: block;
    overflow: hidden;
  }
`;
const StInterestsList = styled.li`
  width: 18%;
  float: left;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 1.5% 3%;
  padding: 1.5% 0;
  color: #ff5036;
  border: 2px solid #ff5036;
  cursor: pointer;

  &::before {
    font-size: 1.3em;
    font-weight: bold;
    content: ${({ $text }) => `'# ${$text}'`};
  }

  &:hover {
    animation-play-state: paused;
    background-color: #ff5036;
    color: #fff;
  }

  &:hover::before {
    content: 'X';
  }
`;
