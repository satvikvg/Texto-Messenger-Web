import React from "react";
import {
  ListItem,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { getMessageTime } from "../../utils/date-helpers";
import IReceipt from "../../interfaces/modals/Receipt";
import IUser from "../../interfaces/modals/User";

interface IMessageItemProps {
  receipt: IReceipt;
  currentUser: IUser;
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
  const { receipt, currentUser } = props;
  const classes = useStyles(props);

  const isMessageIn = receipt.message.createdBy.uid !== currentUser.uid;

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
          <Typography variant="body1">{receipt.message.messageText}</Typography>
        </div>
        <Typography variant="caption">
          {getMessageTime(receipt.message.createdOn)}
        </Typography>
      </div>
    </ListItem>
  );
};
