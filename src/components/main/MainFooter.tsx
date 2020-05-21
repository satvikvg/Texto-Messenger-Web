import React from "react";
import {
  IconButton,
  InputBase,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import EmojiEmotionsOutlinedIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import MicIcon from "@material-ui/icons/Mic";

interface IMainFooterProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerWrapper: {
      display: "flex",
      flex: "0 1 auto",
      padding: theme.spacing(1),
      backgroundColor: "#ededed",
    },
    messageInput: {
      flexGrow: 1,
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(3),
    },
  })
);

export const MainFooter: React.FC<IMainFooterProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerWrapper}>
      <IconButton>
        <EmojiEmotionsOutlinedIcon />
      </IconButton>
      <InputBase
        className={classes.messageInput}
        placeholder="Type a message"
      />
      <IconButton>
        <MicIcon />
      </IconButton>
    </div>
  );
};
