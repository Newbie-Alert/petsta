import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../fireBase';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 3rem 30rem;
  @media screen and (max-width: 960px) {
    padding: 3rem 3rem;
  }
`;

const ContentBox = styled.div`
  width: 100%;
`;

const ContentTitleSection = styled.div`
  width: 100%;
  padding: 1rem;
  font-weight: 600;
  font-size: 4rem;
  border-bottom: 1px solid #1d1d1d;
`;

const ContentsDetail = styled.div`
  width: 100%;
  font-size: 1.25rem;
  line-height: 2rem;
  padding: 1rem;
`;

export default function Post() {
  const { id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'posts'));
        const querySnapshot = await getDocs(q);

        const initialPosts = [];
        querySnapshot.forEach((post) => {
          const data = { id: post.id, ...post.data() };
          initialPosts.push(data);
        });
        setContent(initialPosts.filter((el) => el.cid === id));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <ContentBox>
        <ContentTitleSection>{content !== undefined ? content[0].title : <p>로딩 중</p>}</ContentTitleSection>
        <ContentsDetail>{content !== undefined ? parse(content[0].content) : <p>로딩 중</p>}</ContentsDetail>
      </ContentBox>
    </ContentContainer>
  );
}
