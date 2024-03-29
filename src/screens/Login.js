import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Colors from '../config/Colors';
import {showToast} from '../utils/toast';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import logo from '../../assets/images/logo.png';

const loginCall = async ({email = '', password = ''}, callback) => {
  if (email.length < 5) {
    showToast('Please enter registred email');
    callback(false);
    return;
  }
  if (password.length < 5) {
    showToast('Please enter your password');
    callback(false);
    return;
  }
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      showToast('You are logged in successfully.');
      callback(false);
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        showToast('User not found! Please register');
        callback(false);
        return;
      } else {
        showToast('Invalid creadantial');
        callback(false);
        return;
      }
    });
};

function Login({navigation, route}) {
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const [loader, setLoader] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (route?.params?.email) {
      setData(prev => ({...prev, email: route?.params?.email}));
    }
  }, []);

  const handleChange = (key, text) => {
    setData({...data, [key]: text});
  };

  const handleLogin = async () => {
    setLoader(true);
    loginCall(data, setLoader);
  };

  const handleForget = email => {
    setLoader(true);
    if (email.length < 5) {
      showToast('Please enter registred email');
      return false;
    }
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        showToast('Reset link successfully send to your email');
        setLoader(false);
        setIsLogin(true);
      })
      .catch(error => {
        showToast('Unable to send reset link');
        setLoader(false);
      });
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors.white}}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.brand}>
          <Image
            source={logo}
            style={{width: 80, height: 80, borderRadius: 50}}
          />
        </View>
        {/**login title */}
        {isLogin ? (
          <View style={{marginTop: 50, paddingHorizontal: 30}}>
            <Text style={{color: Colors.black, fontSize: 20}}>
              Welcome Back
            </Text>
            <Text style={{color: Colors.black, marginTop: 5}}>
              You are one step away to wish your loved ones.
            </Text>
          </View>
        ) : (
          <></>
        )}

        {/**Login form content */}
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          {/**email or mobile */}
          <View style={{marginBottom: 5}}>
            <Text style={{color: Colors.black}}>Email or Phone</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="user@gmail.com"
              value={data.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>

          {/**password */}
          {isLogin ? (
            <View style={{marginTop: 10}}>
              <Text style={{color: Colors.black}}>Password</Text>
              <TextInput
                secureTextEntry={!showPassword}
                style={styles.input}
                placeholderTextColor={Colors.lightBlack}
                placeholder="Your Password"
                value={data.password}
                onChangeText={text => handleChange('password', text)}
              />
              {/**show or hide password */}
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', top: 35, right: 10}}>
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
          ) : (
            <></>
          )}
          <TouchableOpacity
            onPress={() => setIsLogin(!isLogin)}
            style={{marginTop: 5}}>
            <Text style={{color: Colors?.primary, textAlign: 'right'}}>
              {isLogin ? 'Forgot Password?' : 'Login'}
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
            }}
            onPress={() =>
              isLogin ? handleLogin() : handleForget(data.email)
            }>
            {loader ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text
                style={{color: Colors.white, fontWeight: '900', fontSize: 15}}>
                {isLogin ? 'Login' : 'Reset Password'}
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
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
              marginTop: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'none',
            }}>
            <FontAwesome name="facebook" size={25} color={Colors.primary} />
            <FontAwesome
              name="instagram"
              size={25}
              color={Colors.primary}
              style={{marginHorizontal: 20}}
            />
            <FontAwesome name="google" size={25} color={Colors.primary} />
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
    </ScrollView>
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
