import React from "react";
import { List, makeStyles, Theme, createStyles } from "@material-ui/core";
import { MessageItem } from "../elements/MessageItem";

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
  const classes = useStyle();
  return (
    <div className={classes.mainWrapper}>
      <List>
        <MessageItem message="Hi Remmy" />
        <MessageItem isMessageIn message="Hello Sender how are you?" />
      </List>
    </div>
  );
};
