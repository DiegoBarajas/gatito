import { io } from 'socket.io-client';
//const URL = process.env.NODE_ENV === 'production' ? "https://gatito.onrender.com" : 'http://localhost:4000';
const URL = 'http://192.168.100.86:4000';
export const socket = io(URL);

