import React, { useState } from 'react'
import io from 'socket.io-client';
import Chat from './Chat';
const socket = io.connect('http://localhost:3001')
const App = () => {
  const [user,setUser] = useState('');
  const [room,setRoom] = useState('');
  const [showChat,setShowChat] = useState(false);

  const handleJoin = () => {
    if(user !== "" && room !== ''){
        socket.emit('join_room',room);
        setShowChat(true);
    };
  }

  return (
    <div>
      {!showChat ?  (
        <>
      <h2>Join a Chat</h2>
      <input type="text" placeholder='USERNAME' onChange={(e) => setUser(e.target.value)}/> <br/>
      <input type="text" placeholder='ROOM ID' onChange={(e) => setRoom(e.target.value)}/> 
      <button onClick={handleJoin}>Join Room</button> </>
      )
      : 
      (
        <Chat socket={socket} user={user} room={room}/>
      )
    }
    </div>
  )
}

export default App