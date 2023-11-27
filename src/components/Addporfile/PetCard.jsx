import React from 'react';
import styled from 'styled-components';

function PetCard({ petData, index }) {
  return (
    <StPetCard $index={index}>
      <StPetImg $imgURL={petData.petimgURL} />
      <StPetNaAgGenBox>
        <StPetNaAgGen>{petData.petKinds}</StPetNaAgGen>/<StPetNaAgGen>{petData.petname} </StPetNaAgGen>/
        <StPetNaAgGen> {petData.petAge}세 </StPetNaAgGen>/<StPetNaAgGen> {petData.petGender}</StPetNaAgGen>
      </StPetNaAgGenBox>
      <StPetIntroduction>{petData.petIntroduction}</StPetIntroduction>
      <StLikeAndDisLikeUl $ul="ul1">
        {petData.petLike.map((item, index) => {
          return <StLikeAndDisLikeLi key={index}>{item}/</StLikeAndDisLikeLi>;
        })}
        <StLikeAndDisLikeLi>을(를) 좋아해요</StLikeAndDisLikeLi>
      </StLikeAndDisLikeUl>
      <StLikeAndDisLikeUl>
        {petData.petDisLike.map((item, index) => {
          return <StLikeAndDisLikeLi key={index}>{item}/ </StLikeAndDisLikeLi>;
        })}
        <StLikeAndDisLikeLi>을(를) 싫어해요요</StLikeAndDisLikeLi>
      </StLikeAndDisLikeUl>
    </StPetCard>
  );
}

export default PetCard;

const StPetCard = styled.li`
  position: absolute;
  top: 50%;
  left: ${({ $index }) => `${$index * 50}%`};
  transform: translateY(-50%);
  width: 30%;
  height: auto;
  padding: 2% 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 7px;
  margin-right: 10%;
  background: #ff5036;
  color: #fff;
  font-weight: bold;
  font-size: 1.1rem;
`;

const StPetImg = styled.div`
  width: 10rem;
  height: 10rem;
  margin-top: 10%;
  border-radius: 50%;
  background-image: url(${({ $imgURL }) => $imgURL});
  background-size: cover;
`;
const StPetNaAgGenBox = styled.div`
  width: 80%;
  height: 2.5rem;
  margin-top: 10%;
`;
const StPetNaAgGen = styled.span`
  margin: 0 4%;
`;
const StPetIntroduction = styled.div`
  width: 82%;
  height: 4rem;
  display: flex;
  text-align: center;
  font-size: 1.4rem;
  padding-top: 5%;
  justify-content: center;
  align-items: flex-start;
`;
const StLikeAndDisLikeUl = styled.ul`
  width: 70%;
  height: 3rem;
  background-color: #dd3014;
  border-radius: 7px;
  padding: 5%;
  margin-bottom: ${({ $ul }) => ($ul === 'ul1' ? '5%' : '0')};
  &::after {
    clear: both;
    content: '';
    display: block;
    overflow: hidden;
  }
`;
const StLikeAndDisLikeLi = styled.li`
  float: left;
  font-size: 0.8rem;
  margin-right: 4%;
  margin-bottom: 3%;
`;
