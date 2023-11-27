import React from 'react';
import styled from 'styled-components';

function PetProfile({ petData }) {
  return (
    <PetProfileContainer>
      <PetImageContainer>
        <img src={petData.petimgURL} alt="" />
        <PetNameAgeGender>{`${petData.petname} / ${petData.petAge}세 / ${petData.petGender}`}</PetNameAgeGender>
      </PetImageContainer>

      <PetInfo>
        <PetIntro>{petData.petIntroduction}</PetIntro>
        <PetLike>
          좋아하는 것:{' '}
          {petData.petLike.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </PetLike>
        <PetUnlike>
          싫어하는 것:{' '}
          {petData.petDisLike.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </PetUnlike>
      </PetInfo>
    </PetProfileContainer>
  );
}

export default PetProfile;

// STYLED-COMPONENTS

const PetProfileContainer = styled.div`
  border: 1px solid #c6c6c6;
  display: flex;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem 3rem 1.25rem 1.25rem;
  width: 90%;
  max-width: 900px;
  border-radius: 10px;
  border: 1px solid black;

  & img {
    width: 130px;
    height: 135px;
    border-radius: 50%;
    flex-basis: 20%;
    margin-right: 1rem;
    object-fit: cover;

    @media screen and (max-width: 768px) {
      flex-basis: 150px;
      height: 105px;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 1rem 0.65rem;
  }
`;

const PetImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PetInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const PetNameAgeGender = styled.h3`
  font-size: 15px;
  font-weight: bolder;
`;

const PetIntro = styled.p`
  font-size: 18px;
  margin-block: 0.45rem;
  padding: 1rem 0 1rem 0.65rem;
  line-height: 1.45rem;
  border-radius: 9px;
  background-color: #eee;
  @media screen and (max-width: 768px) {
    height: 80px;
    padding: 0.45rem 1rem;
    overflow-y: scroll;
  }
`;

const PetLike = styled.p`
  font-size: 14px;
`;

const PetUnlike = styled.p`
  font-size: 14px;
`;

const PetCharaterastic = styled.p`
  font-size: 14px;
`;
