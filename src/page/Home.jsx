import React from 'react';
import styled from 'styled-components';
import MainBanner from '../components/MainBanner/MainBanner';
import Recommend from '../components/Recommend/Recommend';
import Products from '../components/Products/Products';
import { FadeAni } from './MyPage';

const HomeContainer = styled.div`
  width: 100%;
  animation: ${FadeAni} 0.5s forwards;
`;

function Home() {
  return (
    <HomeContainer>
      <MainBanner />
      <Recommend />
      <Products />
    </HomeContainer>
  );
}

export default Home;
