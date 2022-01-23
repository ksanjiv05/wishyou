import React from 'react';
import {
  TextInput,
  Text,
  View,
  Pressable,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const loginCall = async ({email = '', password = ''}, navigation) => {
  if (email.length < 5) {
    showToast('Please enter registred email');
    return false;
  }
  if (password.length < 5) {
    showToast('Please enter your password');
    return false;
  }
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // console.log('User account created & signed in!');
      showToast('You are successfully logedin');
      // navigation.navigate('Tab');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        console.log('user not found');
        showToast('User not found! Please register');
        return;
      }
      showToast('Invalid creadantial');
      console.log(error.code);
    });
};

const handleForget = email => {
  // setLoginState(false);
  if (email.length < 5) {
    showToast('Please enter registred email');
    return false;
  }
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      showToast('Reset link successfully send to your email');
      console.log('link send');
    })
    .catch(error => {
      showToast('Unable to send reset link');
      console.log(error.code);
    });
};

function Login({navigation}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = React.useState(false);
  const [loginState, setLoginState] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setIsLoading] = React.useState(false);

  const handleChange = (key, text) => {
    setData({...data, [key]: text});
  };

  const handleLogin = () => {
    console.log('login call');
    setLoader(true);
    loginCall(data, navigation);
    setLoader(false);
  };
  return (
    <KeyboardAwareScrollView>
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.brand}>
          <Text
            style={{color: Colors.primary, fontWeight: 'bold', fontSize: 30}}>
            Wish You
          </Text>
        </View>
        {/**login title */}
        <View style={{marginTop: 80, paddingHorizontal: 30}}>
          <Text style={{color: Colors.black, fontSize: 20}}>
            Welcome Back🥰
          </Text>
          <Text style={{color: Colors.black, marginTop: 5}}>
            You are one step away to whish your loved ones.
          </Text>
        </View>

        {/**Login form content */}
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          {/**email or mobile */}
          <View style={{marginBottom: 5}}>
            <Text style={{color: Colors.black}}>Email or Phone</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="user@gmail.com"
            />
          </View>

          {/**password */}
          <View style={{marginTop: 10}}>
            <Text style={{color: Colors.black}}>Password</Text>
            <TextInput
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="Your Password"
            />
            {/**show or hide password */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{position: 'absolute', top: 28, right: 10}}>
              {showPassword ? (
                <FontAwesome name="eye" size={30} color={Colors.lightBlack} />
              ) : (
                <FontAwesome
                  name="eye-slash"
                  size={30}
                  color={Colors.lightBlack}
                />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.push('Register')}
            style={{marginTop: 5}}>
            <Text style={{color: Colors?.primary, textAlign: 'right'}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          {/**button */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 15,
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text
                style={{color: Colors.white, fontWeight: '900', fontSize: 15}}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: Colors.lightBlack}}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('Register')}>
              <Text style={{color: Colors?.primary}}>Register</Text>
            </TouchableOpacity>
          </View>

          {/**devider */}
          <View
            style={{
              height: 5,
              backgroundColor: Colors.lightGray,
              marginTop: 30,
              borderRadius: 10,
            }}
          />

          {/**social icons */}
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FontAwesome name="facebook" size={30} color={Colors.primary} />
            <FontAwesome
              name="instagram"
              size={30}
              color={Colors.primary}
              style={{marginHorizontal: 20}}
            />
            <FontAwesome name="google" size={30} color={Colors.primary} />
          </View>

          {/**some notes */}
          <Text
            style={{
              color: Colors.lightBlack,
              textAlign: 'center',
              marginTop: 20,
            }}>
            We stay confident by your loves💖
          </Text>
          <Text
            style={{
              color: Colors.black,
              marginTop: 50,
              marginBottom: 15,
              textAlign: 'center',
            }}>
            &copy; Copyright 2022 | Wish You
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  brand: {
    marginTop: 50,
    alignItems: 'center',
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
});

export default Login;
