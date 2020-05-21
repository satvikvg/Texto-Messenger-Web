import React from "react";
import {
  ListItem,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";

interface IMessageItemProps {
  isMessageIn?: boolean;
  message: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageItem: {
      padding: "0 9%",
      marginBottom: "12px",
    },
    messageWrapper: {
      borderRadius: "7.5px",
      padding: "6px 7px 8px 9px",
      boxShadow: "0 1px 0.5px rgba(0, 0, 0, 0.2)",
    },
    messageIn: {
      backgroundColor: theme.palette.background.paper,
      borderTopLeftRadius: 0,
    },
    messageOut: {
      backgroundColor: "#dcf8c6",
      borderTopRightRadius: 0,
    },
  })
);

export const MessageItem: React.FC<IMessageItemProps> = (props) => {
  const { message, isMessageIn } = props;
  const classes = useStyles(props);

  return (
    <ListItem
      className={classes.messageItem}
      style={{ justifyContent: isMessageIn ? "flex-start" : "flex-end" }}
    >
      <div
        className={`${classes.messageWrapper} ${
          isMessageIn ? classes.messageIn : classes.messageOut
        }`}
      >
        <div>
          <Typography variant="body1">{message}</Typography>
        </div>
        <Typography variant="caption">9:00 AM</Typography>
      </div>
    </ListItem>
  );
};

MessageItem.defaultProps = {
  isMessageIn: false,
};
