import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import RecommendGrid from '../RecommendGrid/RecommendGrid';
import { db } from '../../fireBase';
import { collection, getDocs } from 'firebase/firestore';
import { addPost } from '../../redux/modules/posts';

// STYLED-COMPONENTS
const RecommendSection = styled.div`
  width: 100%;
  padding: 3rem 9rem 3rem 15rem;

  @media screen and (max-width: 960px) {
    padding: 1.25rem;
  }
`;

const RecommendContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const RcommendSectionTitle = styled.h1`
  width: fit-content;
  height: 100%;
  font-weight: 600;
  font-size: 2.25rem;
  margin-block: 1rem;
  color: var(--primary-color);
  border-radius: 5px;

  @media screen and (max-width: 960px) {
    margin: 2rem auto;
    padding-block: 0.5rem;
  }
`;

// MAIN COMPONENTS
export default function Recommend() {
  // Redux State
  const reduxData = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({ id: doc.id, ...doc.data() });
      });
      return dispatch(addPost(posts));
    };
    fetchData();
  }, []);

  return (
    <RecommendSection>
      <RcommendSectionTitle>Recommend SPOT</RcommendSectionTitle>
      <RecommendContainer>
        <RecommendGrid data={reduxData} />
      </RecommendContainer>
    </RecommendSection>
  );
}
