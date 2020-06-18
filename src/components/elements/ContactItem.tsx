import React from "react";
import IContact from "../../interfaces/modals/Contact";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Theme,
  makeStyles,
  createStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      display: "flex",
    },
    primaryTextBody: {
      flexGrow: 1,
    },
    primaryTextCaption: {},
  })
);

type ContactProps = {
  contact: IContact;
};

export const ContactItem: React.FC<ContactProps> = (props) => {
  const primaryText =
    props.contact.user.displayName ||
    props.contact.user.phoneNumber ||
    undefined;
  const avatarURL = props.contact.user.photoURL || undefined;
  const secondaryText = props.contact.user.bio;

  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" button>
      <ListItemAvatar>
        <Avatar alt={primaryText} src={avatarURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className={classes.flex}>
            <Typography variant="body1" className={classes.primaryTextBody}>
              {primaryText}
            </Typography>
            <Typography
              variant="caption"
              className={classes.primaryTextCaption}
            >
              Monday
            </Typography>
          </div>
        }
        secondary={<React.Fragment>{secondaryText}</React.Fragment>}
      />
    </ListItem>
  );
};
