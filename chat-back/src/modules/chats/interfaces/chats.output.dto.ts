import Chats from './chats.entity';
import Messages from '../../messages/interfaces/messages.entity';
import { UsersOutputDTO } from '../../users/interfaces/users.output.dto';

export interface ChatsWithMessagesAndMembers extends Chats {
  messages: Messages[];
  chatMembers: UsersOutputDTO[];
}
