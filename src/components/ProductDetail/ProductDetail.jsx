import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer';
import styled from 'styled-components';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: '',
    image: '',
    name: '',
    price: '',
    discountRate: '',
    RatePrice: '',
    detail: ''
  });

  useEffect(() => {
    axios
      .get('/data/products.json')
      .then((res) => {
        const foundProduct = res.data.products.find((item) => item.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error('Product not found');
        }
      })
      .catch((err) => {
        console.error('Error fetching product data:', err);
      });
  }, [id]);

  return (
    <ProductContainer>
      {product.name ? (
        <>
          <ProductImage src={product.image} alt={product.name} />
          <ProductTitle>{product.name}</ProductTitle>
          <Star>⭐️⭐️⭐️⭐️⭐️</Star>
          <PriceWrap>
            <Price>{product.price}</Price>
            <PriceRate>{product.discountRate}</PriceRate>
          </PriceWrap>
          <RegularPrice>{product.RatePrice}</RegularPrice>
          <DetailImage src={product.detail} alt={product.name} />
        </>
      ) : (
        <Loading>Loading...</Loading>
      )}
      <Footer />
    </ProductContainer>
  );
}

// 스타일
const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: left; /* 여기에 추가 */
`;

const ProductImage = styled.img`
  width: 80vw;
  padding: 20px;
  object-fit: cover;
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {
    width: 90vw;
  }
  @media screen and (max-width: 600px) {
    width: 80vw;
  }
`;

const Star = styled.p`
  margin-bottom: 10px;
  font-size: 15px;
`;

const DetailImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: cover;
  margin-top: 50px;
  margin-bottom: 300px;
`;

const Loading = styled.p`
  margin-top: 20px;
`;

//프로덕트 이름
const ProductTitle = styled.div`
  padding: 0 10px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  height: 30px;
  line-height: 1.13;
`;

//가격 랩
const PriceWrap = styled.div`
  display: flex;
  flex-direction: row; /* 가로 방향으로 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  gap: 10px; /* 각 요소 사이의 간격 설정 */
`;

// 할인 가격
const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 4px 0px 0px;
`;

// 할인율
const PriceRate = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff5036;
  margin: 2px 0px 0px -5px;
`;

// 정상가
const RegularPrice = styled.div`
  color: #aaa;
  text-decoration: line-through;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.5;
`;

export default ProductDetail;
