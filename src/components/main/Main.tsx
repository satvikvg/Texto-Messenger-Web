import React, { Component } from "react";
import MainHeader from "./MainHeader";
import { MainBody } from "./MainBody";
import { MainFooter } from "./MainFooter";

class Main extends Component {
  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <MainBody />
        <MainFooter />
      </React.Fragment>
    );
  }
}

export default Main;
