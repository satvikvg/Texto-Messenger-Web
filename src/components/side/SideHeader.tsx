import React, { Component } from "react";
import { Toolbar, Avatar } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import SideMenu from "./SideMenu";

interface IProps {
  classes: any;
}

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ededed",
    boxShadow: "0.5px 0px 0px 0px #888888"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

class SideHeader extends Component<IProps> {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.root}>
        <Avatar alt={"Avatar"} />
        <div className={classes.root}></div>
        <SideMenu />
      </Toolbar>
    );
  }
}

export default withStyles(styles)(SideHeader);
