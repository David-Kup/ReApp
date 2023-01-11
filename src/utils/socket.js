import { io } from "socket.io-client";
import { SOCKET_BASE } from '../config'

const socket = io.connect(SOCKET_BASE);
export default socket;