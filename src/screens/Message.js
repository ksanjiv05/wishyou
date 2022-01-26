import React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {GlobalContext} from '../../App';
import Colors from '../config/Colors';

function Message({route}) {
  const {socket} = React.useContext(GlobalContext);
  const [message, setMessage] = React.useState('');
  console.log('socket==== ', route);
  const {receiver = '', sender = ''} = route?.params;

  const sendMessage = () => {
    console.log('message is gone');
    socket.emit(
      'message',
      {
        sender: sender,
        receiver: receiver,
        message: message,
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
      console.log('user +++++++++++++++++++++++++++message ', data);
      socket.connect();
    });
  }, [socket]);
  return (
    <View>
      <Text>hii</Text>

      <TextInput
        style={{
          borderWidth: 2,
          borderRadius: 8,
          borderColor: Colors.primary,
          color: Colors.primary,
        }}
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <Pressable onPress={sendMessage}>
        <Text style={{padding: 10, backgroundColor: Colors.primary}}>
          send message
        </Text>
      </Pressable>
    </View>
  );
}

export default React.memo(Message);
