import React, { useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  createStyles,
  Theme,
  Avatar,
  Paper,
} from "@material-ui/core";
import { useTypedSelector } from "../../../store";
import { useDispatch } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { PhoneNumberForm } from "../forms/PhoneNumberForm";
import { VerifyOTPForm } from "../forms/VerifyOTPForm";
import { Redirect } from "react-router-dom";
import {
  signInWithPhoneNumber,
  confirmOTP,
} from "../../../store/authentication/actions";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },
    image: {
      backgroundImage: "url(https://source.unsplash.com/random)",
      backgroundRepeat: "no-repeat",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[50]
          : theme.palette.grey[900],
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
  })
);

export const Login: React.FC<{}> = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOTP] = useState("");

  const loginPhase = useTypedSelector(
    (store) => store.authentication.loginPhase
  );

  const dispatch = useDispatch();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event && typeof event !== "string" && event.target) {
      const value = event.target.value;
      switch (event.target.name) {
        case "otp":
          setOTP(value);
          break;

        default:
          return;
      }
    } else if (typeof event === "string") {
      setPhoneNumber(event);
    }
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const appVerifier = window.recaptchaVerifier;
    dispatch(
      signInWithPhoneNumber.request(undefined, { phoneNumber, appVerifier })
    );
    event.preventDefault();
  };

  const handleOtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(confirmOTP.request(undefined, otp));
  };

  const classes = useStyle();

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginPhase === "enter-phone-number" ? (
            <PhoneNumberForm
              handleChange={handleChange}
              handleSubmit={handleSignInSubmit}
            />
          ) : loginPhase === "enter-otp" ? (
            <VerifyOTPForm
              handleChange={handleChange}
              handleSubmit={handleOtpSubmit}
            />
          ) : (
            <Redirect to="/verifyProfile" exact />
          )}
        </div>
      </Grid>
    </Grid>
  );
};
