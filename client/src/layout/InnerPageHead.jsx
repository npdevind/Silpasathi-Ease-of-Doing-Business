import React from "react";
import Header from "./Header";
import MenuBar from "./MenuBar";
import News from "./News";
import Banner from "./Banner";

const InnerPageHead = () => {
  return (
    <>
      <Header />
      <MenuBar />
      <News />
      <Banner pageIndex={"innerPage"} />
    </>
  );
};

export default InnerPageHead;
