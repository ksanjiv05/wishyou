import React from 'react';
import {
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import {searchAndAddContact} from '../apis/contact/contact';
import auth from '@react-native-firebase/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import PhoneContacts from 'react-native-contacts';
import ContactItem from '../components/ContactItem';

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
