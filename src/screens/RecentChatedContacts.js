import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TextInput,
  Button,
  Linking,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
  Alert,
} from 'react-native';
import {getContacts} from '../apis/contact/contact';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
const screenHight = Dimensions.get('screen').height;

function RecentChatedContacts({navigation}) {
  const uid = auth().currentUser.email;
  const [contacts, setContacts] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  async function fetchContacts() {
    const responce = await getContacts('?uid=' + 'sanjiv@innobuzz.in');
    if (responce && responce.status === 200) {
      //   console.log('contacts ', responce.data.contacts);
      setContacts(responce.data.contacts);
    }
    setLoader(false);
  }

  const goToMsg = item => {
    navigation.navigate('Message', {receiver: item.email, sender: uid});
    console.log('pressed to message', item.email);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        // style={{}}
        onPress={() => goToMsg(item)}
        // onPress={() =>
        //   navigation.navigate('Home', {
        //     screen: 'Message',
        //     params: {h: 'hii'},
        //   })
        // }
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.primary,
            maxHeight: 60,
            marginBottom: 5,
            padding: 10,
            marginHorizontal: 5,
            borderRadius: 8,
          }}>
          <View
            style={{
              flex: 1,
              maxWidth: 60,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 100,
                width: 50,
                height: 50,
              }}></View>
          </View>
          <View style={{flex: 1, width: 50}}>
            <Text style={{textTransform: 'capitalize', color: Colors.white}}>
              {item.name}
            </Text>
            <Text style={{color: Colors.white}}>
              {item?.recentChatState?.lastChat}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              maxWidth: 30,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                color: Colors.primary,
                backgroundColor: Colors.white,
                borderRadius: 19,
                textAlign: 'center',
              }}>
              1
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    fetchContacts();
  }, []);

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
    <View style={{flex: 1}}>
      {loader ? (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: Colors.primary,
              maxHeight: 70,
              marginHorizontal: 5,
              flex: 1,
              marginBottom: 5,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
            }}>
            <TextInput
              placeholder="Search Your contact"
              style={{
                borderRadius: 5,
                color: Colors.primary,
                backgroundColor: Colors.white,
                paddingLeft: 10,
              }}
            />
          </View>
          <FlatList data={contacts} renderItem={renderItem} />
        </>
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          padding: 20,
          backgroundColor: Colors.primary,
          borderRadius: 50,
        }}
        onPress={() => navigation.navigate('Contacts')}>
        <FontAwesome name="address-book-o" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(RecentChatedContacts);
