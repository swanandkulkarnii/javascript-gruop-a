import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer/Footer";
const Layout = (props) => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Footer></Footer>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
