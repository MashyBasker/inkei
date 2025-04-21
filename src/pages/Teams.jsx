import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Navbar from '../components/ui/navbar';

const socket = io('http://localhost:5000');

const publicRooms = ['general', 'random', 'default'];
const adminRooms = ['admin-lounge', 'ceo-chat'];

const Teams = () => {
  const [roomId, setRoomId] = useState('default');
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState('Product Manager');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('chatHistory', (history) => {
      setMessages(history);
    });

    socket.on('notification', (note) => {
      setMessages((prev) => [...prev, { system: true, message: note }]);
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('chatHistory');
      socket.off('notification');
    };
  }, []);

  const joinRoom = () => {
    if (!user.trim() || !roomId.trim()) return;
    socket.emit('joinRoom', { roomId, user, role });
  };

  const leaveRoom = () => {
    socket.emit('leaveRoom', { roomId, user });
    setMessages([]);
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', { roomId, user, message });
      setMessage('');
    }
  };

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  return (
    
    <div className="h-screen w-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans flex flex-col items-center justify-center px-6 py-4">
      <Navbar />
      <div className="w-full h-full max-w-5xl mx-auto flex flex-col bg-black/40 mt-[60px] border border-indigo-600 shadow-2xl rounded-xl backdrop-blur-md p-6 space-y-6 neon-border">

        <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 drop-shadow-lg">
          ZENITH TEAMS
        </h1>

        <div className="bg-black/60 p-4 rounded-lg text-sm space-y-2 border border-slate-700">
          <div>
            <span className="font-semibold text-cyan-400">Public Rooms:</span>{' '}
            {publicRooms.join(', ')}
          </div>
          <div>
            <span className="font-semibold text-pink-500">Admin Rooms:</span>{' '}
            {adminRooms.join(', ')}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="p-3 rounded bg-slate-900 text-white border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-slate-400 transition-all"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            className="p-3 rounded bg-slate-900 text-white border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 transition-all"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded bg-slate-900 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        >
          <option value="CEO">CEO</option>
          <option value="Senior Manager">Senior Manager</option>
          <option value="Product Manager">Product Manager</option>
        </select>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={joinRoom}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-400 hover:to-lime-300 transition-all font-bold text-black shadow-md"
          >
            Join
          </button>
          <button
            onClick={leaveRoom}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-400 hover:from-red-400 hover:to-pink-300 transition-all font-bold text-black shadow-md"
          >
            Leave
          </button>
        </div>

        <div
          ref={chatBoxRef}
          className="flex-1 h-[300px] sm:h-[400px] overflow-y-auto bg-slate-900/80 p-4 rounded-lg space-y-2 text-sm border border-slate-700 scrollbar-thin scrollbar-thumb-fuchsia-500"
        >
          {messages.map((msg, idx) => (
            <div key={idx}>
              {msg.system ? (
                <em className="text-slate-400">{msg.message}</em>
              ) : (
                <div>
                  <span className="font-semibold text-cyan-300">{msg.user}</span>: {msg.message}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <input
            className="flex-1 p-3 rounded bg-slate-900 text-white border border-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 placeholder-slate-400 transition-all animate-pulse focus:animate-none"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 transition-all rounded-lg font-bold shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teams;
