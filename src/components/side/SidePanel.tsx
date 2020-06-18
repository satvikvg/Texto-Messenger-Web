import React from "react";
import { List } from "@material-ui/core";
import { useTypedSelector } from "../../store";
import IUser from "../../interfaces/modals/User";
import { UserItem } from "../elements/UserItem";

interface ISidePanelProps {}

export const SidePanel: React.FC<ISidePanelProps> = () => {
  const users = useTypedSelector((store) => store.chats.searchResults.users);
  return (
    <React.Fragment>
      <List>
        {users &&
          users.map((user, index) => (
            <UserItem key={index} user={{ ...user } as IUser} />
          ))}
      </List>
    </React.Fragment>
  );
};
