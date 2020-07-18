import { createStyles, List, makeStyles, Theme } from "@material-ui/core";
import React, { useEffect, useCallback } from "react";
import IReceipt from "../../interfaces/modals/Receipt";
import { useTypedSelector } from "../../store";
import { AuthenticationSelector } from "../../store/authentication/reducer";
import { ConversationSelector } from "../../store/conversation/reducer";
import { MessageItem } from "../elements/MessageItem";
import { subscribeReceipts } from "../../store/conversation/actions";
import IConversation from "../../interfaces/modals/Conversation";
import { useDispatch } from "react-redux";

interface IMainBodyProps {}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    mainWrapper: {
      flex: "1 1 auto",
      backgroundImage: `url(${process.env.PUBLIC_URL}/chat_background_default.png)`,
    },
  })
);

export const MainBody: React.FC<IMainBodyProps> = () => {
  // Subscribe to required data from store.
  const currentUser = useTypedSelector(AuthenticationSelector.getCurrentUser);
  const conversation = useTypedSelector(
    ConversationSelector.getActiveConversation
  );
  const receipts = useTypedSelector(ConversationSelector.getReceipts);

  // Initialize dispatcher.
  const dispatch = useDispatch();
  const stableDispatch = useCallback(dispatch, []);

  // Style classes.
  const classes = useStyle();

  useEffect(() => {
    // If conversation exists && conversation is not new then,
    // Subscribe to conversations receipts from databse.
    if (conversation && conversation.uid !== "") {
      // Always unsubcribe to previous subscription and then do a fresh subscribe on load.
      stableDispatch(subscribeReceipts.cancel());
      stableDispatch(subscribeReceipts.request(conversation as IConversation));
    }

    return () => {
      // Always cancel subscribtion on unmount.
      stableDispatch(subscribeReceipts.cancel());
    };
  }, [conversation, stableDispatch]);

  if (!currentUser) {
    console.error("User not authenticated");
    return null;
  }

  return (
    <div className={classes.mainWrapper}>
      <List>
        {receipts &&
          receipts.map((receipt) => (
            <MessageItem
              receipt={receipt as IReceipt}
              currentUser={currentUser}
            />
          ))}
      </List>
    </div>
  );
};
