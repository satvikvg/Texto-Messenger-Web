import React from "react";
import { List } from "@material-ui/core";
import { SideItem } from "./SideItem";

interface ISidePanelProps {}

export const SidePanel: React.FC<ISidePanelProps> = () => {
  return (
    <React.Fragment>
      <List>
        <SideItem />
      </List>
    </React.Fragment>
  );
};
