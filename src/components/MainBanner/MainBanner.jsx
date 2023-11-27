import React from 'react';
import styled from 'styled-components';

// Styled-Components
const BannerContainer = styled.div`
  width: 100%;
`;

const BannerTemplates = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.52)), ${(props) => `${props.$image}`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const BannerTexts = styled.div`
  width: fit-content;
  padding: 0 1rem;
  text-align: center;
  position: absolute;
  bottom: 0%;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: translate(-50%, -15%);
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;

  & h1 {
    font-size: 2.5rem;
  }
  & p {
    font-size: 1.25rem;
    margin-block: 0.3rem;
  }

  @media screen and (max-width: 768px) {
    h1 {
      width: 100%;
      font-size: 1.6rem;
    }
    p {
      width: max-content;
      font-size: 1rem;
      margin-block: 0.3rem;
    }
  }
`;

const BannerButton = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: 110px;
  height: fit-content;
  margin: auto;
  margin-block: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid white;
  background-color: transparent;

  color: ${(props) => (props.$bgColor === 'Log in' ? 'var(--primary-color)' : 'white')};
  &:hover {
    background-color: var(--primary-color);
    color: white;
    border: 1px solid white;
  }
`;

// Styled-Components 반복 생성 시 사용하는 변수
const campaign = [
  {
    title: '반려동물 생활백서',
    subtitle: '반려견이 제일 좋아하는 놀이편',
    image: "url('/assets/images/main_banner.jpg')"
  }
];

// Main Component
export default function MainBanner() {
  return (
    <BannerContainer>
      {campaign.map((el, i) => (
        <BannerTemplates key={i} $image={el.image}>
          <BannerTexts>
            <h1>{el.title}</h1>
            <p>- {el.subtitle} -</p>
            <BannerButton>Join Today</BannerButton>
          </BannerTexts>
        </BannerTemplates>
      ))}
    </BannerContainer>
  );
}
