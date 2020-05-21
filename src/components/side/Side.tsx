import React, { Component } from "react";
import SideHeader from "./SideHeader";
import { SideSearch } from "./SideSearch";
import { SidePanel } from "./SidePanel";

class Side extends Component {
  render() {
    return (
      <React.Fragment>
        <SideHeader />
        <SideSearch />
        <SidePanel />
      </React.Fragment>
    );
  }
}

export default Side;
