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
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import PhoneContacts from 'react-native-contacts';
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

  const renderItem = ({item}) => {
    //  <View>
    //    <Text>{item}</Text>
    //    {contacts.map(cobj => {
    //      console.log(cobj.phone.includes(item) ? '' : 'invite', cobj.phone);
    //      return <Text>{!cobj.phone.includes(item) ? '' : 'invite'}</Text>;
    //    })}
    //  </View>;
    return (
      <TouchableOpacity
        style={{}}
        onPress={() =>
          //navigation.navigate('Message')
          console.log('presseds', item)
        }>
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
              sanjiv kumar
            </Text>
            <Text style={{color: Colors.white}}>12/03/2020</Text>
          </View>
          <View
            style={{
              flex: 1,
              maxWidth: 60,
              alignContent: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                color: Colors.primary,
                backgroundColor: Colors.white,
                borderRadius: 8,
                textAlign: 'center',
              }}>
              invite
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {loader ? (
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <Text>Please wait. it is first time </Text>
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
