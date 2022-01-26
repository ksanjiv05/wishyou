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
  Alert,
} from 'react-native';
import {
  createContact,
  getContacts,
  searchContact,
} from '../apis/contact/contact';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import PhoneContacts from 'react-native-contacts';
const screenHight = Dimensions.get('screen').height;

const ModalContant = ({uid}) => {
  const [email, setEmail] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const [searched, setSearched] = React.useState(null);
  const search = async () => {
    setLoader(true);
    const responce = await searchContact('?email=' + email);

    if (responce && responce.status === 200) {
      console.log('search youser data', responce.data);

      setSearched(responce.data.user);
    }

    if (responce && responce.status === 201) {
      showToast('Contact Already Added');
    } else {
      showToast('Unable to process your request');
    }
    setLoader(false);
  };

  const getAllContacts = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(
      PhoneContacts.checkPermission().then(res => {
        console.log('access', res);
        if (res === 'authorized') {
          console.log('ath');
          PhoneContacts.getAll()
            .then(respon => {
              respon.map(da => {
                console.log(
                  'contact is ',
                  da.displayName,
                  '-- ',
                  da.phoneNumbers[0]?.number.replace(/[^\d]/g, ''),
                );
              });
              // console.log('get conmtact', JSON.parse(respon));
            })
            .catch(err => {
              console.log('err', err);
            });
        }
      }),
    );
    // PhoneContacts.checkPermission().then(res => {
    //   console.log('access', res);
    //   if (res === 'authorized') {
    //     console.log('ath');
    //     PhoneContacts.getAll()
    //       .then(respon => {
    //         console.log('get conmtact', respon);
    //       })
    //       .catch(err => {
    //         console.log('err', err);
    //       });
    //   } else if (res === 'denied') {
    //     Alert.alert('AppName', 'You have to give permission to get contacts ', [
    //       {
    //         text: 'Cancel',
    //         onPress: () => console.log('Cancel Pressed'),
    //         style: 'cancel',
    //       },
    //       {text: 'Allow', onPress: () => Linking.openSettings()},
    //     ]);
    //   }
    // });
  };

  const handleAddContact = async () => {
    setLoader(true);
    await createContact({uid, cid: searched.email});
    setLoader(false);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.lightBlack,
        height: 250,
        marginHorizontal: 20,
        alignContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 15,
        paddingVertical: 15,
        // justifyContent: 'center',
        marginTop: screenHight / 4,
      }}>
      <View style={{marginBottom: 5}}>
        <Text style={{color: Colors.black}}>Search By Email</Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <TextInput
            style={{
              backgroundColor: Colors.lightGray,
              paddingHorizontal: 10,
              borderRadius: 10,
              width: 200,
              marginTop: 5,
              display: 'flex',
              borderWidth: 1,
              borderColor: Colors.gray,
              color: Colors.black,
            }}
            placeholderTextColor={Colors.lightBlack}
            placeholder="user@gmail.com"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TouchableOpacity
            style={{
              // position: 'absolute',
              display: 'flex',
              width: 60,
              padding: 20,
              backgroundColor: Colors.primary,
              borderRadius: 50,
            }}
            onPress={getAllContacts}>
            <FontAwesome name="search" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        {/** tto add contact button*/}
        {searched ? (
          <Button
            title={searched.email + ' +'}
            style={{flex: 1, height: 50}}
            color={Colors.primary}
            onPress={handleAddContact}></Button>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

function Contacts({navigation}) {
  const uid = auth().currentUser.email;
  const [contacts, setContacts] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  async function fetchContacts() {
    const responce = await getContacts('?uid=' + uid);
    if (responce && responce.status === 200) {
      setContacts(responce.data);
    }
    setLoader(false);
  }

  const addContact = () => {};
  React.useEffect(() => {
    setLoader(true);
    fetchContacts();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Text>Contact</Text>
      <TouchableOpacity
        style={{backgroundColor: 'red'}}
        onPress={() => navigation.navigate('Message')}>
        <Text>alax@gmail.com</Text>
      </TouchableOpacity>
      {/** modal to add new contact */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {modalVisible ? <ModalContant uid={uid} /> : <></>}
      </Modal>

      {/**button to add contact */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          padding: 20,
          backgroundColor: Colors.primary,
          borderRadius: 50,
        }}
        onPress={() => setModalVisible(!modalVisible)}>
        <FontAwesome name="edit" size={20} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

export default Contacts;
