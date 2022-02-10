import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Button,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {createContact, searchAndAddContact} from '../apis/contact/contact';
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
  const [contactsToInvite, setContactsToInvite] = React.useState([]);
  const [filteredContacts, setFilteredContacts] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  const filterContact = text => {
    const newContacts = contactsToInvite.filter(
      c => c?.name == text || c?.phone == text,
    );
  };

  const getAllContacts = () => {
    setLoader(true);
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(
      PhoneContacts.checkPermission().then(res => {
        if (res === 'authorized') {
          PhoneContacts.getAll()
            .then(async respon => {
              let contactsIdsLocal = [];
              let localNumbers = [];
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
                  localNumbers.push({
                    phone: contact.phoneNumbers[0]?.number,
                    name: contact.displayName,
                    image: contact?.thumbnailPath,
                  });
                });
              setContactsToInvite(localNumbers);
              setFilteredContacts(localNumbers);
              setLoader(false);

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
    if (contacts.filter(c => c.phone === item.phone).length > 0) {
      return <ContactItem item={item} key={index} />;
    } else {
      return <ContactItem item={item} key={index} invite={true} />;
    }
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
              position: 'relative',
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
              onChangeText={text => filterContact(text)}
            />
            <MaterialIcons
              name="search"
              size={25}
              color={Colors.gray}
              style={{position: 'absolute', top: 18, left: 10}}
            />
          </View>
          <View>
            <FlatList
              data={filteredContacts}
              renderItem={renderItem}
              extraData={contacts}
            />
          </View>
        </>
      )}
    </View>
  );
}

export default Contacts;
