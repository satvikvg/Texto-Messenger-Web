import React, { Component, Dispatch } from "react";
import {
  Toolbar,
  Avatar,
  Typography,
  Theme,
  withStyles,
} from "@material-ui/core";
import { MainMenu } from "./MainMenu";
import { RootState, RootAction } from "../../store";
import { ConversationSelector } from "../../store/conversation/reducer";
import { connect, ConnectedProps } from "react-redux";
import IUser from "../../interfaces/modals/User";
import IParticipant from "../../interfaces/modals/Participant";
import { AuthenticationSelector } from "../../store/authentication/reducer";
import { getLastSeenFormat as getLastSeenFormattedDate } from "../../utils/date-helpers";
import IConversation from "../../interfaces/modals/Conversation";
import { getParticipants } from "../../store/conversation/actions";

type IProps = PropsFromRedux & {
  classes: any;
};

const styles = (theme: Theme) => ({
  root: {
    flex: "0 1 auto",
    backgroundColor: "#ededed",
    borderLeft: "1px solid #e0e0e0",
    boxShadow: "0.5px 0px 0px 0px #888888",
  },
  chatHeaderTextWrapper: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
});

class MainHeader extends Component<IProps> {
  componentDidMount() {
    if (this.props.conversation && !this.props.participants) {
      this.props.getParticipants(this.props.conversation as IConversation);
    }
  }

  render() {
    const { classes, conversation, participants, currentUser } = this.props;

    const otherParticipant =
      conversation &&
      participants &&
      currentUser &&
      this.getOtherParticipant(
        conversation as IConversation,
        participants as IParticipant[],
        currentUser
      );

    const avatarURL =
      otherParticipant?.user.photoURL || conversation?.avatarURL || undefined;
    const title =
      otherParticipant?.user.displayName ||
      otherParticipant?.user.phoneNumber ||
      otherParticipant?.user.userName ||
      conversation?.name;

    // TODO: Implement lastseen functionality and pass date here.
    const subtitle = getLastSeenFormattedDate(new Date());

    return (
      <Toolbar className={classes.root}>
        <Avatar src={avatarURL} />
        <div className={classes.chatHeaderTextWrapper}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="caption">{subtitle}</Typography>
        </div>
        <MainMenu />
      </Toolbar>
    );
  }

  getOtherParticipant(
    conversation: IConversation,
    participants: IParticipant[],
    currentUser: IUser
  ): IParticipant | undefined {
    if (conversation.type === "INDIVISUAL" && participants) {
      const otherParticipants = participants.filter(
        (participant) => participant.user.uid !== currentUser.uid
      );
      return otherParticipants[0]; // Converstaion of type 'INDIVISUAL' with always have 2 participants.
    }
  }
}

const mapStateToProps = (store: RootState) => {
  return {
    currentUser: AuthenticationSelector.getCurrentUser(store),
    conversation: ConversationSelector.getActiveConversation(store),
    participants: ConversationSelector.getParticipantList(store),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return {
    getParticipants: (conversation: IConversation) =>
      dispatch(getParticipants.request(conversation)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(withStyles(styles)(MainHeader));
