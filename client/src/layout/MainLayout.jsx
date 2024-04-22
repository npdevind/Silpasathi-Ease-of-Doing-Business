import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import MenuBar from "./MenuBar";
import News from "./News";
import Banner from "./Banner";
import "../scss/global.scss";

const MainLayout = () => {
  return (
    <>
      <Header />
      <MenuBar />
      <News />
      <Banner pageIndex={"index"} />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
