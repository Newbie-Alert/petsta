import React from 'react';
import styled from 'styled-components';
import MasterPorfile from '../components/Addporfile/MasterPorfile';
import PetProfile from '../components/Addporfile/PetProfile';
import PetAdd from '../components/Addporfile/PetAdd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { profileAddCommit } from '../redux/modules/addProfile';

function AddProfile() {
  const addPetProfile = useSelector((state) => state.addPetProfile);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const profileAddHandler = (id, e, navigate) => {
    dispatch(profileAddCommit({ id, e, navigate }));
  };
  return (
    <StAddProfileWrap>
      {addPetProfile.addModal === true ? <PetAdd /> : null}
      <StAddProfileContainer>
        <StAddProfileHeaderBox>
          <StAddProFiletitle $title="title1">프로필 등록</StAddProFiletitle>
          <StAddBtn
            onClick={(e) => {
              profileAddHandler(id, e, navigate);
            }}
          >
            등록
          </StAddBtn>
        </StAddProfileHeaderBox>

        <StAddProfileBox>
          <MasterPorfile />
          <PetProfile />
        </StAddProfileBox>
      </StAddProfileContainer>
    </StAddProfileWrap>
  );
}

export default AddProfile;

const StAddProfileWrap = styled.div`
  width: 100%;
  height: 120vh;
  font-size: 12px;
`;

const StAddProfileContainer = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StAddProfileHeaderBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
`;

const StAddProFiletitle = styled.div`
  flex: 7;
  font-size: 4rem;
  font-weight: 400;
  margin: 5% 0;
  display: flex;
  justify-content: center;
`;

const StAddBtn = styled.button`
  flex: 1;
  background-color: #ff5036;
  border: 0;
  color: #fff;
  border-radius: 7px;
  padding: 1% 0%;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5036;
    background-color: #fff;
    color: #ff5036;
  }
`;

const StAddProfileBox = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
