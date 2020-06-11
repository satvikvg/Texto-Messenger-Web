import Chat from "../modals/Chat";

export default interface ChatService {
  openChat(): Chat | null;
}
