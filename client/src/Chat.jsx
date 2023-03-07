import React, { useEffect, useState } from 'react'

const Chat = ({socket,user,room}) => {
    const [currentMessage,setCurrentMessage] = useState('');
    const [messageList,setMessageList] = useState([])

    const sendMessage = async () => {
        if(currentMessage !== ''){
            const messageData = {
                room : room,
                author : user,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit('send_message', messageData);
            setMessageList((list) => [...list,messageData])
        }
    };
    useEffect(() => {
        //call this function kada god ima neka promjena na serveru
        socket.on("recive_message", (data) => {
            setMessageList((list) => [...list,data]);
            //postavlja list na sve sto je bilo i prije i na 
            //novu data koju ce da primi 
        });
    },[socket])
  return (
    <div>
        <h2>Chat</h2>
        <div>
            <p>Live chat</p>
        </div>
        <div style={{border : '3px solid goldenrod'}}>
            {messageList.map((messageContent) => (
                <>
                <div>
                 <p> {messageContent.message}</p>
                </div>
                <div>
                    <p>-{messageContent.time}</p>
                    <p>-{messageContent.author}</p>
                    <hr/>
                </div>
                </>
            ))}
        </div>
        <div>
            <input type="text" placeholder='send message>>>'onChange={(e) => setCurrentMessage(e.target.value)}/>
            <button onClick={sendMessage}> &#9658; </button>
        </div>
    </div>
  )
}

export default Chat