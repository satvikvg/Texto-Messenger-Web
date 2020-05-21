import React from "react";
import {
  Button,
  Box,
  makeStyles,
  createStyles,
  Theme,
  TextField,
} from "@material-ui/core";
import Copyright from "../Copyright";

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

export const VerifyOTPForm: React.FC<IProps> = (props) => {
  const classes = useStyle();

  return (
    <form className={classes.form} noValidate onSubmit={props.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="otp"
        label="Enter Verification Code"
        name="otp"
        autoFocus
        onChange={props.handleChange}
      />
      <Button
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
