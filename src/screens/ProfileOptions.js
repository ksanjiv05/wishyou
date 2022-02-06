import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import default_male from '../../assets/images/default-male.jpg';
import Colors from '../config/Colors';
import VerificationBadge from '../components/VerificationBadge';
import RoundedButton from '../components/RoundedButton';
import {useIsFocused} from '@react-navigation/native';
import {showToast} from '../utils/toast';

const ProfileOptions = ({navigation}) => {
  const {width, height} = Dimensions.get('window');
  const [user, setUser] = React.useState({});
  const isFocused = useIsFocused();
  React.useEffect(() => {
    setUser({
      displayName: auth().currentUser.displayName,
      photoURL: auth().currentUser.photoURL,
      verified: auth().currentUser.emailVerified,
    });
    return () => {
      setUser({});
    };
  }, [isFocused]);

  const verifyEmail = () => {
    auth()
      .currentUser.sendEmailVerification()
      .then(res => {
        showToast(
          'We have sent you a verification link on your email. Please verity it.',
        );
      })
      .catch(err => {
        showToast('Something went wrong! Try after some time.');
        console.log(err);
      });
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
            source={user?.photoURL ? {uri: user?.photoURL} : default_male}
            style={styles.image}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <Text style={styles.name}>{user?.displayName}</Text>
          <VerificationBadge
            status={user?.verified}
            icon={true}
            style={{justifyContent: 'center'}}
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
            label="Contacts"
            style={styles.btn}
            onPress={() => navigation.navigate('Contacts')}
          />
          <RoundedButton
            label="Feedback"
            style={styles.btn}
            onPress={() => navigation.navigate('Feedback')}
          />
          {!user?.verified && (
            <RoundedButton
              label="Verify"
              style={styles.btn}
              onPress={verifyEmail}
            />
          )}
          <RoundedButton
            label="Contacts"
            style={styles.btn}
            onPress={() => navigation.navigate('Contacts')}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: Colors.white}}>Wish You</Text>
          <Text style={{color: Colors.white}}>v0.0.1</Text>
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
