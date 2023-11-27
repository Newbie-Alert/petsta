import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../page/Home';
import MyPage from '../page/MyPage';
import LoginPage from '../page/LoginPage';
import Header from '../components/Header/Header';
import Shop from '../page/Shop';
import Footer from '../components/Footer';
import Signup from '../page/Signup';
import AddProfile from '../page/AddProfile';
import WritePage from '../page/WritePage';
import Feeds from '../page/Feeds';
import Follow from '../page/Follow';
import GlobalStyle from '../styled/GlobalStyle';
import MainDetail from '../components/MainDetail/MainDetail';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import EditProfile from '../components/EditProfile/EditProfile';
import Post from '../page/Post';

function Router() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addprofile/:id" element={<AddProfile />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/posts" element={<Feeds />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/maindetail" element={<MainDetail />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
