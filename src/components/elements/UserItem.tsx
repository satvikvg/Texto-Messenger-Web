import React from "react";
import IUser from "../../interfaces/modals/User";
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

type UserProps = {
  selectedUID: string;
  user: IUser;
  onClick: (
    user: IUser,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export const UserItem: React.FC<UserProps> = (props) => {
  const primaryText =
    props.user.displayName || props.user.phoneNumber || undefined;
  const avatarURL = props.user.photoURL || undefined;
  const secondaryText = props.user.bio;

  const classes = useStyles();
  return (
    <ListItem
      selected={props.selectedUID === props.user.uid}
      button
      onClick={(event) => props.onClick(props.user, event)}
      alignItems="flex-start"
    >
      <ListItemAvatar>
        <Avatar alt={primaryText} src={avatarURL} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <div className={classes.flex}>
            <Typography variant="body1" className={classes.primaryTextBody}>
              {primaryText}
            </Typography>
          </div>
        }
        secondary={<React.Fragment>{secondaryText}</React.Fragment>}
      />
    </ListItem>
  );
};
