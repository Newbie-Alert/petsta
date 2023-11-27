import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ProductSection = styled.div`
  width: 100%;
  background-color: #eee;
`;

const ProductContainer = styled.div`
  padding: 1rem 15rem 12rem 15rem;
  @media screen and (max-width: 1400px) {
    padding: 1.5rem 3rem 9rem 2rem;
  }
  @media screen and (max-width: 960px) {
    padding: 1rem 2rem 12rem 2rem;
  }
`;

const ProductTitle = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
  width: fit-content;
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--primary-color);
`;

const ToShop = styled.button.attrs((props) => ({
  type: 'button'
}))`
  width: fit-content;
  height: fit-content;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    color: var(--primary-color);
    outline: none;
    border: none;
  }
`;

//프로덕트 랩
const ShopWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 0 auto;
  padding: 0 20px;
  margin-top: 30px;
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 90%;
    padding: 10px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ItemBox = styled.div`
  cursor: pointer;
  width: 250px;
  @media screen and (max-width: 1400px) {
    width: 350px;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

//프로덕트 이미지
const ProductImage = styled.img`
  max-width: 100%; /* 이미지가 컨테이너를 벗어나지 않도록 설정 */
  height: auto;
  border-radius: 20px;
`;

//프로덕트 이름
const ProductT = styled.div`
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
  justify-content: space-between;
`;

//할인 가격
const Price = styled.div`
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
  margin-block: 1rem;
`;

//할인율
const PriceRate = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #ff5036;
  margin: 2px 0px 0px -5px;
`;
//정상가
const RegularPrice = styled.div`
  color: #aaa;
  text-decoration: line-through;
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;
`;

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('/data/products.json').then((data) => {
      setProducts(data.data.products);
    });
  }, []);

  // Hook
  const navi = useNavigate();

  // FUNCTIONS
  const goShop = () => {
    navi('/shop');
    window.scrollTo({ top: true });
  };

  const goDetail = (e) => {
    e.stopPropagation();
    navi(`shop/${e.target.id}`);
  };

  return (
    <>
      <ProductSection>
        <ProductContainer>
          <ProductTitle>
            Products
            <ToShop onClick={() => goShop()}>제품 더 보기</ToShop>
          </ProductTitle>
          <ShopWrap>
            {products?.slice(0, 4).map((product) => (
              <ItemBox key={product.id} id={product.id} onClick={goDetail}>
                <div id={product.id} onClick={goDetail}>
                  <ProductImage id={product.id} onClick={goDetail} src={product.image} alt={product.name} />
                </div>
                <ProductT id={product.id} onClick={goDetail}>
                  {product.name}
                </ProductT>
                <PriceWrap id={product.id} onClick={goDetail}>
                  <Price>{product.price}</Price>
                  <PriceRate>{product.discountRate}</PriceRate>
                </PriceWrap>
                <RegularPrice>{product.RatePrice}</RegularPrice>
              </ItemBox>
            ))}
          </ShopWrap>
        </ProductContainer>
      </ProductSection>
    </>
  );
}
