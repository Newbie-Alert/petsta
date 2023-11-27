import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Footer() {
  const [footerView, setFooterView] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 800) setFooterView(true);
      else setFooterView(false);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        if (window.scrollY > 800) setFooterView(true);
        else setFooterView(false);
      });
    };
  }, []);

  return (
    <>
      <Footerstyle $footerview={footerView}>
        <div>
          <Logo src="/assets/img/logo.png" alt="logo" />

          <FooterUL>
            <FooterList>
              <p>주식회사 펫스타그램</p>
              <li>서울 서대문구 연희동</li>
            </FooterList>
            <FooterList>
              <li>사업자등록번호: 123-45-00123</li>
              <li>통신판매업신고: 2023-서울마포-12345</li>
            </FooterList>
            <FooterList>
              <li>대표: B5조 | 개인정보책임자: B5조 </li>
              <li>TEL: 1500-1234 | Email:hello@petstagram.co</li>
            </FooterList>
          </FooterUL>
        </div>
      </Footerstyle>
    </>
  );
}

// 로고
const Logo = styled.img`
  width: 150px;
  margin-left: -8px;
`;
export default Footer;

//푸터
const Footerstyle = styled.footer`
  position: fixed;
  bottom: ${(props) => (props.$footerview === true ? '0%' : '-100%')};
  width: 100%;
  border-top: 1px solid #c4c4c4;
  padding: 0.9rem 1rem;
  color: #808080;
  font-size: 12px;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  padding: 0.3rem 3rem 1.5rem 3rem;
  background-color: white;
  transition: all 0.4s ease;
  @media screen and (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const FooterUL = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const FooterList = styled.div`
  display: flex;
  flex-direction: column;
`;
