import React from "react";
import { makeStyles, createStyles, Theme, Grid } from "@material-ui/core";
import Side from "../../side/Side";
import Main from "../../main/Main";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appContainer: {
      height: "100vh",
    },
    mainSectionContainer: {
      display: "flex",
      flexFlow: "column",
    },
  })
);

export const Home: React.FC<{ classes: any }> = (props) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.appContainer}>
      <Grid item xs={4}>
        <Side />
      </Grid>
      <Grid item xs={8} className={classes.mainSectionContainer}>
        <Main />
      </Grid>
    </Grid>
  );
};
