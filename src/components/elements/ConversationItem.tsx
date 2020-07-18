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

type ConversationProps = {
  selectedUID: string;
  conversation: IConversation;
  onClick: (
    conversation: IConversation,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

export const ConversationItem: React.FC<ConversationProps> = ({
  selectedUID,
  conversation,
  onClick,
}) => {
  const primaryText = conversation.name || undefined;
  const avatarURL = conversation.avatarURL || undefined;
  const secondaryText = "Get last chat message from databse if available";

  const classes = useStyles();
  return (
    <ListItem
      selected={selectedUID === conversation.uid}
      button
      onClick={(event) => onClick(conversation, event)}
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
