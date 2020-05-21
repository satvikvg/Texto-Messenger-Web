import React, { useEffect } from "react";
import {
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
// @ts-ignore
import MaterialUiPhoneNumber from "material-ui-phone-number";
import Copyright from "../Copyright";
import firebase from "firebase";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
);

type IProps = {
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const PhoneNumberForm: React.FC<IProps> = (props) => {
  const classes = useStyle();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      console.log("Attaching window.recaptchaVerifier");
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "sign-in-with-phone-number",
        {
          size: "invisible",
        }
      );
    }
  });

  return (
    <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
      <MaterialUiPhoneNumber
        defaultCountry="in"
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="phone"
        autoFocus
        onChange={props.handleChange}
      />
      <Button
        id="sign-in-with-phone-number"
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Verify
      </Button>
      <Box mt={5}>
        <Copyright />
      </Box>
    </form>
  );
};
