import React from "react";
import IConversation from "../../interfaces/modals/Conversation";
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
import { useDispatch } from "react-redux";
import { setActiveChat } from "../../store/chats/actions";

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
  chat: IConversation;
};

export const ChatItem: React.FC<ChatProps> = ({ chat }) => {
  const primaryText = chat.name || undefined;
  const avatarURL = chat.avatarURL || undefined;
  const secondaryText = "Get last chat message from databse if available";

  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(setActiveChat(chat));
  };

  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start" button onClick={handleClick}>
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
