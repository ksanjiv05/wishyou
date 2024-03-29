import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../config/Colors';
import ImagePicker from 'react-native-image-crop-picker';

import default_male from '../../assets/images/default-male.jpg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {picUpdate, updateUser} from '../apis/auth/auth';
import {showToast} from '../utils/toast';
import Loader from '../components/Loader';

const updatePic = async uri => {
  const formData = new FormData();
  formData.append('pic', {
    name: 'profile.jpg',
    type: 'image/jpg',
    uri,
  });

  formData.append('uid', auth().currentUser.uid);
  formData.append('email', auth().currentUser.email);

  const res = await picUpdate(formData);
  if (!res) {
    showToast('Unable to update pic');
    //  setIsLoading(false);
    return;
  }
  if (res && res.status === 200) {
    // console.log('pic updated -', res.data);
    auth().currentUser.updateProfile({
      photoURL: res.data.url,
    });

    showToast('Profile updated successfully.');
    return;
  }
};

//  displayName  email emailVerified phoneNumber
const updateProfile = async data => {
  const res = await updateUser(data);
  // console.log('---', res.status, res.data, data.phoneNumber);
  if (!res) {
    showToast('Unable to update profile');
    return true;
  }
  if (res && res.status === 200) {
    // console.log('profile updated -', res.data);
    const up = await auth().currentUser.updateProfile({
      displayName: data.displayName,
      phoneNumber: data.phoneNumber,
    });
    // console.log('up ', up);
    showToast('Profile updated successfully.');
    return true;
  }
};

function Profile({navigation}) {
  const [isLoading, setIsLoading] = React.useState(false);
  let pic = auth().currentUser.photoURL
    ? {uri: auth().currentUser.photoURL}
    : default_male;

  const [user, setUser] = React.useState({});
  const [profile_pic, setProfilePic] = React.useState(pic);

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

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    const status = await updateProfile(user);
    if (status) {
      setIsLoading(false);
    }
  };

  const picImage = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setProfilePic({uri: image.path});
        updatePic(image.path);
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {isLoading && <Loader text="Processing..." />}
      {auth().currentUser ? (
        <ScrollView keyboardDismissMode="interactive" style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginTop: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              {/**user image */}
              <View
                style={{
                  ...styles.profile_pic,
                  width: 180,
                  height: 180,
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
            </View>
            {/**profiles to update */}
            <View style={{marginTop: 30}}>
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
                  editable={false}
                  // onChangeText={text => handleChange('email', text)}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <Text style={{color: Colors.black}}>Mobile</Text>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.lightBlack}
                  placeholder="+919281928192"
                  value={user.phoneNumber}
                  editable={false}
                  // onChangeText={text => handleChange('phoneNumber', text)}
                />
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleProfileUpdate}>
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
    paddingRight: 5,
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
