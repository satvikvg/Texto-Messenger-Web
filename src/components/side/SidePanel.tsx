import React, { useState } from "react";
import { List } from "@material-ui/core";
import { useTypedSelector } from "../../store";
import IUser from "../../interfaces/modals/User";
import { UserItem } from "../elements/UserItem";
import { ContactItem } from "../elements/ContactItem";
import IContact from "../../interfaces/modals/Contact";
import IConversation from "../../interfaces/modals/Conversation";
import { ConversationItem } from "../elements/ConversationItem";
import { ContactsSelector } from "../../store/contacts/reducer";
import { ConversationSelector } from "../../store/conversation/reducer";
import { AuthenticationSelector } from "../../store/authentication/reducer";
import { useDispatch } from "react-redux";
import {
  createConversation,
  createParticipants,
} from "../../utils/conversation-helpers";
import {
  setActiveConversation,
  getParticipants,
} from "../../store/conversation/actions";

interface ISidePanelProps {}

export const SidePanel: React.FC<ISidePanelProps> = () => {
  // Define selected item state
  const [selectedUID, setSelectedUID] = useState("");

  // Subscribe to required data from redux store.
  const currentUser = useTypedSelector(AuthenticationSelector.getCurrentUser);

  const { contacts, users } = useTypedSelector(
    ContactsSelector.getSearchResults
  );

  const conversations = useTypedSelector(
    ConversationSelector.getSearchCoversationsResults
  );

  // Initialize a dispatcher.
  const dispatch = useDispatch();

  // All click event hanlders.
  const handleConversationItemClick = (
    conversation: IConversation,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Dispatch an action to set active conversation.
    dispatch(setActiveConversation(conversation));

    // Set selected item
    setSelectedUID(conversation.uid);
  };

  const handleContactItemClick = (
    contact: IContact,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!currentUser) {
      console.error(
        "Open Conversation: User is not Authenticated to perform this operation."
      );
      return;
    }
    // Dispatch an action to set active conversation.
    dispatch(createConversation(currentUser));

    // Set selected item
    setSelectedUID(contact.uid);
  };

  const handleUserItemClick = (
    user: IUser,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!currentUser) {
      console.error(
        "Open Conversation: User is not Authenticated to perform this operation."
      );
      return;
    }
    // Dispatch an action to set active conversation.
    const conversation = createConversation(currentUser);
    const participants = createParticipants(
      conversation,
      [currentUser, user],
      currentUser
    );
    dispatch(setActiveConversation(conversation));
    dispatch(getParticipants.success(participants));

    // Set selected item
    setSelectedUID(user.uid);
  };

  return (
    <React.Fragment>
      <List>
        {
          // Show all search results matching Conversations.
          conversations &&
            conversations.map((conversation) => (
              <ConversationItem
                key={conversation.uid}
                selectedUID={selectedUID}
                conversation={{ ...conversation } as IConversation}
                onClick={handleConversationItemClick}
              />
            ))
        }

        {
          // Show all search results matching Contacts.
          contacts &&
            contacts.map((contact) => (
              <ContactItem
                key={contact.uid}
                selectedUID={selectedUID}
                contact={{ ...contact } as IContact}
                onClick={handleContactItemClick}
              />
            ))
        }

        {
          // Show all search results matching Users.
          users &&
            users.map((user) => (
              <UserItem
                key={user.uid}
                selectedUID={selectedUID}
                user={{ ...user } as IUser}
                onClick={handleUserItemClick}
              />
            ))
        }
      </List>
    </React.Fragment>
  );
};
