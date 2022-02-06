import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import default_male from '../../assets/images/default-male.jpg';
import Colors from '../config/Colors';
import VerificationBadge from '../components/VerificationBadge';
import RoundedButton from '../components/RoundedButton';
import {useIsFocused} from '@react-navigation/native';

const ProfileOptions = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  // let pic = auth().currentUser.photoURL
  //   ? {uri: auth().currentUser.photoURL}
  //   : default_male;
  const [user, setUser] = React.useState({});
  // const [profile_pic, setProfilePic] = React.useState(pic);

  const isFocused = useIsFocused();
  React.useEffect(() => {
    setUser({
      displayName: auth().currentUser.displayName,
      email: auth().currentUser.email,
      phoneNumber: auth().currentUser.phoneNumber,
      photoURL: auth().currentUser.photoURL,
    });
    return () => {
      setUser({});
    };
  }, [auth().currentUser, isFocused]);

  const singOut = async () => {
    const res = await auth().signOut();
    console.log('__________________singout______________', res);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <View
          style={{
            ...styles.profile_pic,
            width: width / 2,
            height: height / 4,
          }}>
          <Image
            source={
              auth().currentUser.photoURL
                ? {uri: auth().currentUser.photoURL}
                : default_male
            }
            style={styles.image}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{auth().currentUser.displayName}</Text>
          <VerificationBadge
            status={auth().currentUser.emailVerified}
            icon={true}
          />
        </View>
      </View>

      {/**import links */}
      <View style={styles.linksContainer}>
        <View>
          <RoundedButton
            label="Profile"
            style={styles.btn}
            onPress={() => navigation.navigate('Profile')}
          />
          <RoundedButton
            label="Settings"
            style={styles.btn}
            onPress={() => navigation.navigate('Settings')}
          />
          <RoundedButton
            label="Feedback"
            style={styles.btn}
            onPress={() => navigation.navigate('Feedback')}
          />
          <RoundedButton
            label="Contacts"
            style={styles.btn}
            onPress={() => navigation.navigate('Contacts')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text>Wish You</Text>
          <Text>v0.0.1</Text>
        </View>
      </View>
    </View>
  );
};

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
  linksContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 20,
    overflow: 'hidden',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ProfileOptions;
