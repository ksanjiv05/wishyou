import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {GlobalContext} from '../../App';

function Message() {
  const {socket} = React.useContext(GlobalContext);
  // console.log('socket ', socket);

  const sendMessage = () => {
    console.log('message is gone');
    socket.emit(
      'message',
      {
        sender: 'alax@gmail.com',
        receiver: 'sanjiv@innobuzz.in',
        message: 'hii alax',
        type: 'text',
      },
      status => {
        console.log('Message send', status);
      },
    );
  };

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected', socket.id); // "G5p5..."
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
      // socket.connect();
    });
    socket.on('message', data => {
      console.log('user message ', data);
      socket.connect();
    });
  }, [socket]);
  return (
    <View>
      <Text>hii</Text>
      <Pressable onPress={sendMessage}>
        <Text>send message</Text>
      </Pressable>
    </View>
  );
}

export default Message;
