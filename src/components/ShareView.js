import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  PermissionsAndroid,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../config/Colors';
import default_male from '../../assets/images/default-male.jpg';
import RoundedButton from './RoundedButton';
import Loader from './Loader';
import {saveCard} from '../apis/card';
import auth from '@react-native-firebase/auth';
import {showToast} from '../utils/toast';
import PhoneContacts from 'react-native-contacts';
import {searchAndAddContact} from '../apis/contact/contact';

const RenderMe = ({item, setSelected, selected, remove}) => {
  const url = item?.photoUrl ? {uri: item.photoUrl} : default_male;
  const [isSelected, setIsSelected] = React.useState(false);
  React.useEffect(() => {
    setIsSelected(selected.indexOf(item.email) !== -1 ? true : false);
  }, [selected]);
  if (item.email !== auth().currentUser.email) {
    return (
      <TouchableHighlight
        onPress={() => remove(item.email)}
        onLongPress={() =>
          selected.indexOf(item.email) === -1 &&
          setSelected(prev => [...prev, item.email])
        }>
        <View
          style={{
            ...styles.container,
            backgroundColor: isSelected ? Colors.primary : Colors.lightGray,
          }}>
          <Image
            source={url}
            resizeMode="center"
            style={{width: 50, height: 50, borderRadius: 50}}
          />
          <View style={{marginLeft: 20}}>
            <Text
              style={{
                color: isSelected ? Colors.white : Colors.black,
                fontWeight: '600',
                fontSize: 18,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                color: isSelected ? Colors.white : Colors.lightBlack,
                fontWeight: '400',
                fontSize: 14,
              }}>
              {item.email}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  } else {
    return null;
  }
};

const saveData = async (card, selected) => {
  const data = {
    uid: auth().currentUser.email,
    tag: card?.category,
    title: card.text.title,
    text: card.text.text,
    tagline: card.text.tagline,
    background: card.background,
    format: card.format,
    position: {
      titleline: {
        x:
          typeof card.position.title.x === 'object'
            ? card.position.title.x?.__getValue()
            : card.position.title.x,
        y:
          typeof card.position.title.y === 'object'
            ? card.position.title.y?.__getValue()
            : card.position.title.y,
      },
      textline: {
        x:
          typeof card.position.text.x === 'object'
            ? card.position.text.x?.__getValue()
            : card.position.text.x,
        y:
          typeof card.position.text.y === 'object'
            ? card.position.text.y?.__getValue()
            : card.position.text.y,
      },
      tagline: {
        x:
          typeof card.position.tagline.x === 'object'
            ? card.position.tagline.x?.__getValue()
            : card.position.tagline.x,
        y:
          typeof card.position.tagline.y === 'object'
            ? card.position.tagline.y?.__getValue()
            : card.position.tagline.y,
      },
    },
    wishYous: selected,
  };

  const res = await saveCard(data);
  if (!res) {
    showToast('Unable to save your card! Please try again.');
    return true;
  }
  if (res && res.status === 200) {
    showToast('You shared this card successfully.');
    return true;
  }
};

const ShareView = ({close, card}) => {
  const [selected, setSelected] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const deSelect = email => {
    const newlist = selected.filter(user => user !== email);
    setSelected(newlist);
  };

  React.useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = () => {
    setIsLoading(true);
    const uid = auth().currentUser.email;
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
                    image: contact.thumbnailPath,
                  });
                });

              const responce = await searchAndAddContact({
                uid,
                contacts: contactsIdsLocal,
              });

              if (responce && responce.status === 200) {
                setContacts(responce.data.contacts);
                showToast('Contact Updated');
                setIsLoading(false);
              } else {
                setIsLoading(false);
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

  const sendMe = async () => {
    if (selected?.length === 0) {
      showToast('Please select user to send.');
      return;
    }
    setIsLoading(true);
    const res = await saveData(card, selected);
    if (res) {
      setIsLoading(false);
      close();
    }
  };

  return (
    <>
      {isLoading && <Loader text="Processing..." />}
      <View style={{flex: 1}}>
        <TouchableOpacity style={styles.close} onPress={close}>
          <Entypo name="cross" size={50} color={Colors.white} />
        </TouchableOpacity>
        <View style={styles.longPressContainer}>
          <Text style={{fontSize: 20, fontWeight: '600', color: Colors.white}}>
            {selected.length > 0
              ? `${selected.length} selected`
              : 'Select Users'}
          </Text>
          <Text style={{color: Colors.white}}>Long press to select</Text>
        </View>
        <FlatList
          keyExtractor={item => item._id}
          data={contacts}
          renderItem={({item}) => (
            <RenderMe
              item={item}
              setSelected={setSelected}
              selected={selected}
              remove={deSelect}
            />
          )}
          extraData={selected}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: Colors.primary,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <RoundedButton label="Send" onPress={sendMe} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 200,
  },
  container: {
    padding: 10,
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  longPressContainer: {
    backgroundColor: Colors.black,
    padding: 10,
  },
});

export default ShareView;
