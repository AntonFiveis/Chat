import Chats from './chats.entity';
import Messages from '../../messages/interfaces/messages.entity';

export interface ChatsWithMessages extends Chats {
  messages: Messages[];
}
