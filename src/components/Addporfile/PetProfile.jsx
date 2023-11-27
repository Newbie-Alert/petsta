import React, { useEffect } from 'react';
import styled from 'styled-components';
import { addPetModal } from '../../redux/modules/addPetProfile';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../fireBase';
import { useParams } from 'react-router-dom';
import { pedtDataRead } from '../../redux/modules/addPetProfile';
import PetCard from './PetCard';

function PetProfile() {
  const addPetProfile = useSelector((state) => state.addPetProfile);
  const dispatch = useDispatch();
  const { id } = useParams();

  const addPetModalHandler = () => {
    dispatch(addPetModal());
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StPetPorfileWrap>
        <StPetPorfileTitle>반려동물을 등록해 주세요</StPetPorfileTitle>
        <StAddPetBtn onClick={addPetModalHandler}>반려동물 등록</StAddPetBtn>
      </StPetPorfileWrap>
      <StPetCardWarp>
        {addPetProfile?.petData?.map((item, index) => {
          return <PetCard petData={item} index={index} key={item.id} />;
        })}
      </StPetCardWarp>
    </>
  );
}

export default PetProfile;

const StPetPorfileWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StPetPorfileTitle = styled.div`
  width: 80%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const StAddPetBtn = styled.button`
  background-color: #ff5036;
  border: 0;
  color: #fff;
  border-radius: 7px;
  padding: 1% 2%;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff5036;
    background-color: #fff;
    color: #ff5036;
  }
`;

const StPetCardWarp = styled.ul`
  position: relative;
  width: 100%;
  height: 70%;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
