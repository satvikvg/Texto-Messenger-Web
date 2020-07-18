import IUser from "../interfaces/modals/User";
import IConversation from "../interfaces/modals/Conversation";
import IParticipant from "../interfaces/modals/Participant";

export function createConversation(currentUser: IUser): IConversation {
  // Current date time for defining created date of conversation data.
  const currentDate = new Date();

  // Create new Conversation.
  const conversation: IConversation = {
    avatarURL: null, // Indivisual conversation will always display user avatar.
    createdBy: currentUser,
    createdOn: currentDate,
    muteTill: null,
    name: null, // Indivisual conversations will always display users name as conversation name.
    type: "INDIVISUAL", // A conversation with single contact will always be of type 'INDIVISUAL'.
    uid: "", // New data UID will always be empty.
    updatedOn: currentDate,
  };

  return conversation;
}

export function createParticipants(
  conversation: IConversation,
  users: IUser[],
  currentUser: IUser
): IParticipant[] {
  // Current date time for defining created date of conversation data.
  const currentDate = new Date();

  // Define participants of conversation.
  const participants = users.map<IParticipant>((user) => {
    return {
      conversation: conversation,
      createdOn: currentDate,
      role:
        conversation.type === "INDIVISUAL" || currentUser.uid !== user.uid
          ? "MEMBER"
          : "ADMIN",
      uid: "",
      updatedOn: currentDate,
      user: user,
    };
  });

  return participants;
}
