import React from "react";
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

interface ISidePanelProps {}

export const SidePanel: React.FC<ISidePanelProps> = () => {
  // Subscribe to required data from redux store.
  const { contacts, users } = useTypedSelector(
    ContactsSelector.getSearchResults
  );

  const conversations = useTypedSelector(
    ConversationSelector.getSearchCoversationsResults
  );

  // All click event hanlders.
  const handleConversationItemClick = (
    conversation: IConversation,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  const handleContactItemClick = (
    contact: IContact,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  const handleUserItemClick = (
    user: IUser,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {};

  return (
    <React.Fragment>
      <List>
        {
          // Show all search results matching Conversations.
          conversations &&
            conversations.map((conversation) => (
              <ConversationItem
                key={conversation.uid}
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
                user={{ ...user } as IUser}
                onClick={handleUserItemClick}
              />
            ))
        }
      </List>
    </React.Fragment>
  );
};
