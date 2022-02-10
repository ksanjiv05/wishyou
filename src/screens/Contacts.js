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
import {
  createContact,
  getContacts,
  searchAndAddContact,
  searchContact,
} from '../apis/contact/contact';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import PhoneContacts from 'react-native-contacts';
import ContactItem from '../components/ContactItem';
const screenHight = Dimensions.get('screen').height;

const ModalContant = ({uid}) => {
  const [email, setEmail] = React.useState('');
  const [loader, setLoader] = React.useState(true);
  const [searched, setSearched] = React.useState(null);
  // const search = async () => {
  //   setLoader(true);
  //   const responce = await searchContact('?email=' + email);
  //   if (responce && responce.status === 200) {
  //     console.log('search youser data', responce.data);
  //     setSearched(responce.data.user);
  //   }
  //   if (responce && responce.status === 201) {
  //     showToast('Contact Already Added');
  //   } else {
  //     showToast('Unable to process your request');
  //   }
  //   setLoader(false);
  // };

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
  const [contactIds, setContactIds] = React.useState([1, 2, 3]);
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
  // React.useEffect(() => {
  //   setLoader(true);
  //   fetchContacts();
  // }, []);

  const getAllContacts = () => {
    setLoader(true);
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
            .then(async respon => {
              let contactsIdsLocal = [];
              console.log('Length ', respon.length);
              respon &&
                respon.map(contact => {
                  const whitSpaceErs = contact.phoneNumbers[0]?.number.replace(
                    /[^\d]/g,
                    '',
                  );
                  whitSpaceErs !== undefined
                    ? contactsIdsLocal.push(
                        whitSpaceErs.substr(whitSpaceErs.length - 10),
                      )
                    : '';
                });

              // setContactIds(contactsIdsLocal);
              const responce = await searchAndAddContact({
                uid,
                contacts: contactsIdsLocal,
              });

              if (responce && responce.status === 200) {
                setContacts(responce.data.contacts);
                showToast('Contact Updated');
              } else {
                showToast('unable to Updated');
              }

              setLoader(false);
              // console.log('get conmtact', JSON.parse(respon));
            })
            .catch(err => {
              console.log('err', err);
            });
        }
      }),
    );
  };

  React.useEffect(() => {
    getAllContacts();
  }, []);

  const renderItem = ({item, index}) => {
    return <ContactItem item={item} key={index} />;
  };

  return (
    <View style={{flex: 1}}>
      {loader ? (
        <ActivityIndicator
          style={{flex: 1, backgroundColor: Colors.white}}
          color={Colors.primary}
        />
      ) : (
        <>
          <View
            style={{
              maxHeight: 70,
              flex: 1,
            }}>
            <TextInput
              placeholder="Search Your contact"
              placeholderTextColor={Colors.lightBlack}
              style={{
                borderRadius: 5,
                color: Colors.black,
                backgroundColor: Colors.white,
                paddingRight: 10,
                paddingVertical: 15,
                paddingLeft: 50,
              }}
            />
            <MaterialIcons
              name="search"
              size={25}
              color={Colors.gray}
              style={{position: 'absolute', top: 18, left: 10}}
            />
          </View>
          <FlatList data={contactIds} renderItem={renderItem} />
        </>
      )}

      {/** modal to add new contact */}
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        {modalVisible ? <ModalContant uid={uid} /> : <></>}
      </Modal> */}

      {/**button to add contact */}
    </View>
  );
}

export default Contacts;
