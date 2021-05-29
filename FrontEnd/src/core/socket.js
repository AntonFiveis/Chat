import { Client } from 'rpc-websockets';

const socket = new Client('ws:localhost:3001');
socket.on('ADD_CHAT', (res) => console.log(res));
socket.on('REMOVE_CHAT_MEMBER', (res) => console.log(res));
socket.on('ADD_CHAT_MEMBER', (res) => console.log(res));
socket.on('ADD_MESSAGE', (res) => console.log(res));
export default socket;
