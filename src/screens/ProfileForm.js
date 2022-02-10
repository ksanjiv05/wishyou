import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../config/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ProfileForm = () => {
  const [checked, setChecked] = React.useState('male');
  const [data, setData] = React.useState({
    name: '',
    phone: '',
    address: '',
    country: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleUpdateProfile = () => {
    // console.log("profile form -- ", data, checked);
  };

  const handleChange = (key, text) => {
    console.log('text', text, key);
    setData(prevData => ({...prevData, [key]: text}));
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: Colors.primary}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}>
        <Text style={{fontSize: 25, color: '#fff'}}>Profile</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    position: 'relative',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: '22%',
  },
  input: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
  },
});

export default ProfileForm;
