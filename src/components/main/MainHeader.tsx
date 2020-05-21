import React, { Component } from "react";
import {
  Toolbar,
  Avatar,
  Typography,
  Theme,
  withStyles
} from "@material-ui/core";
import { MainMenu } from "./MainMenu";

interface IProps {
  classes: any;
}

const styles = (theme: Theme) => ({
  root: {
    flex: "0 1 auto",
    backgroundColor: "#ededed",
    borderLeft: "1px solid #e0e0e0",
    boxShadow: "0.5px 0px 0px 0px #888888"
  },
  chatHeaderTextWrapper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  }
});

class MainHeader extends Component<IProps> {
  render() {
    const { classes } = this.props;
    return (
      <Toolbar className={classes.root}>
        <Avatar />
        <div className={classes.chatHeaderTextWrapper}>
          <Typography variant="body1">Remmy Sharp</Typography>
          <Typography variant="caption">Last seen todat at 9:02 PM</Typography>
        </div>
        <MainMenu />
      </Toolbar>
    );
  }
}

export default withStyles(styles)(MainHeader);
