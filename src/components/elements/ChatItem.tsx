import React from "react";
import Chat from "../../interfaces/modals/Chat";
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

type ChatProps = {
  chat: Chat;
};

export const ChatItem: React.FC<ChatProps> = (props) => {
  const primaryText = props.chat.chatName || undefined;
  const avatarURL = props.chat.chatImage || undefined;
  const secondaryText = "Get last chat message from databse if available";

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
