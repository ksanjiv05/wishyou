import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../config/Colors';
import ImagePicker from 'react-native-image-crop-picker';

import default_male from '../../assets/images/default-male.jpg';
import default_female from '../../assets/images/default-female.jpg';
import VerificationBadge from '../components/VerificationBadge';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Profile({navigation}) {
  const {width, height} = Dimensions.get('window');
  const profile_pic = auth().currentUser.photoURL
    ? {uri: auth().currentUser.photoURL}
    : default_male;

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    setUser({
      displayName: auth().currentUser.displayName,
      email: auth().currentUser.email,
      phoneNumber: auth().currentUser.phoneNumber,
      photoURL: auth().currentUser.photoURL,
    });
  }, [auth().currentUser]);

  const handleChange = (key, value) => {
    setUser(prev => ({...prev, [key]: value}));
  };

  const picImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        console.log(image);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {auth().currentUser ? (
        <ScrollView keyboardDismissMode="interactive" style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/**user image */}
              <View
                style={{
                  ...styles.profile_pic,
                  width: width / 2,
                  height: height / 4,
                }}>
                <Image source={profile_pic} style={styles.image} />
                <TouchableOpacity style={styles.upload} onPress={picImage}>
                  <MaterialIcons
                    name="photo-camera"
                    size={30}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
              {/**details */}
              <View style={{marginLeft: 10}}>
                <Text style={styles.name}>
                  {auth().currentUser.displayName}
                </Text>
                <Text style={styles.normal}>{auth().currentUser.email}</Text>
                <Text style={styles.normal}>
                  {auth().currentUser.phoneNumber}
                </Text>
                <VerificationBadge status={auth().currentUser.emailVerified} />
              </View>
            </View>
            {/**profiles to update */}
            <View style={{marginTop: 10}}>
              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.black}}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.lightBlack}
                  placeholder="Dev Sharma"
                  value={user.displayName}
                  onChangeText={text => handleChange('displayName', text)}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.black}}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.lightBlack}
                  placeholder="dev@gmail.com"
                  value={user.email}
                  onChangeText={text => handleChange('email', text)}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.black}}>Mobile</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.lightBlack}
                  placeholder="+919281928192"
                  value={user.phoneNumber}
                  onChangeText={text => handleChange('phoneNumber', text)}
                />
              </View>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          style={{flex: 1, backgroundColor: Colors.white}}
          color={Colors.primary}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  profile_pic: {
    backgroundColor: Colors.lightGray,
    borderRadius: 300,
    overflow: 'hidden',
    borderColor: Colors.lightGray,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    color: Colors.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  normal: {
    color: Colors.black,
    marginVertical: 2,
  },
  input: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray,
    color: Colors.black,
  },
  button: {
    paddingVertical: 18,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  upload: {
    position: 'absolute',
    zIndex: 300,
    bottom: 10,
    right: 50,
    width: 40,
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Profile;
