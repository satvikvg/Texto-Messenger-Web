import React, { useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
import User from "../../../interfaces/modals/User";
import { useTypedSelector } from "../../../store";
import { useDispatch } from "react-redux";
import { saveUserProfileAsync } from "../../../store/settings/actions";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      margin: theme.spacing(4, 8),
    },
    avatarNameWrapper: {
      display: "inherit",
      flexDirection: "row",
      alignItems: "center",
      margin: theme.spacing(2, 0),
    },
    avatar: {
      width: "80px",
      height: "80px",
      marginRight: theme.spacing(2),
    },
    otherInputWrapper: {
      display: "inherit",
      flexDirection: "column",
      alignItems: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

export const VerifyProfile: React.FC<{}> = (props) => {
  const activeUser = useTypedSelector(
    (store) => store.authentication.activeUser
  );

  const userProfile = useTypedSelector((store) => store.settings.userProfile);

  const [user, setUser] = useState<User>(
    activeUser
      ? activeUser
      : {
          uid: "",
          userName: "",
          displayName: null,
          email: null,
          phoneNumber: null,
          photoURL: null,
          bio: null,
          emailVerified: false,
          isOnline: false,
          lastSeen: null,
        }
  );

  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!event.target) {
      return;
    }

    const value = event.target.value;

    switch (event.target.name) {
      case "userName":
        setUser((prevUser) => ({ ...prevUser, userName: value }));
        return;

      case "displayName":
        setUser((prevUser) => ({
          ...prevUser,
          displayName: value,
        }));
        return;

      case "bio":
        setUser((prevUser) => ({ ...prevUser, bio: value }));
        return;

      default:
        return;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(saveUserProfileAsync.request(undefined, { userProfile: user }));
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      {userProfile && <Redirect to="/" />}
      {!userProfile && (
        <Grid container component="main" className={classes.root}>
          <Grid item xs={false} sm={4} md={7} />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <form noValidate onSubmit={handleSubmit}>
              <div className={classes.paper}>
                <Typography variant="h6">Review Your Profile</Typography>

                <div className={classes.avatarNameWrapper}>
                  <Avatar className={classes.avatar} />
                  <TextField
                    variant="standard"
                    margin="none"
                    fullWidth
                    label="Your Name"
                    name="displayName"
                    autoComplete="name"
                    value={user.displayName}
                    helperText="This name will be displayed to
            your Texto Messenger contacts."
                    onChange={handleChange}
                  />
                </div>
                <div className={classes.otherInputWrapper}>
                  <TextField
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    name="userName"
                    value={user.userName}
                    onChange={handleChange}
                  />
                  <Typography variant="caption" color="textSecondary">
                    You can choose a username on{" "}
                    <strong>Texto Messenger</strong>. If you do, other people
                    will be able to find you by this username and contact you
                    without knowing your phone number.
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    You can use <strong>a-z, 0-9</strong> and underscores.
                    Minimum length is <strong>5</strong> characters.
                  </Typography>

                  <TextField
                    variant="standard"
                    margin="normal"
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={user.bio}
                    helperText="You can add a few lined about yourself. Anyone who opens your profile will see this text."
                    onChange={handleChange}
                  />
                </div>

                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.submit}
                >
                  Save &amp; Continue
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
};
