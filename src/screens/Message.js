import React from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {GlobalContext} from '../../App';
import Colors from '../config/Colors';

function Message({route}) {
  const {socket} = React.useContext(GlobalContext);
  const [message, setMessage] = React.useState('');
  console.log('rouute==== ', route);
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
    socket.on('message', data => {
      console.log(
        '---------------------------message-------------------------------',
        data,
      );
      // socket.connect();
    });
  }, []);

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
