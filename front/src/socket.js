import { io } from 'socket.io-client';
const URL = process.env.NODE_ENV === 'production' ? "https://gatito.onrender.com" : 'http://192.168.100.86:4000';

export const socket = io(URL);

