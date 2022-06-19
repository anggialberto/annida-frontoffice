import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ InnerComponent }) => {
  console.log('InnerComponent', InnerComponent);
  return (
    <>
      {/*<MetaTag />*/}
      <Header />
      <InnerComponent />
      <Footer />
    </>
  );
}

export default Layout;
