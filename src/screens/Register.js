import React from 'react';
import {
  View,
  ToastAndroid,
  TextInput,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {register} from '../apis/auth/auth';
import Colors from '../config/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const showToast = msg => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const psregx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const emailRgx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const registerCall = async ({
  name = '',
  email = '',
  phone = '',
  password = '',
}) => {
  if (name.length < 3) {
    showToast('Please enter your name');
    return false;
  }

  if (phone.length !== 10) {
    showToast('Please enter valid phone number');
    return false;
  }
  if (!emailRgx.test(email)) {
    showToast('Please enter valid email');
    return false;
  }

  if (!psregx.test(password)) {
    showToast(
      'Password should contains at least one capital, special char and number',
    );
    return false;
  }
  if (password.length < 8) {
    showToast('Password should be 8 char');
    return false;
  }
  // console.log('register');
  const res = await register({name, email, phone, password});
  if (res && res.status === 200) {
    showToast('Registered sucessfully');
    return true;
  } else {
    showToast('Unable to register');
    return false;
  }
};

function Register({navigation}) {
  const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (key, text) => {
    setData({...data, [key]: text});
  };

  const handleRegister = async () => {
    setLoader(true);
    // console.log('register', data);
    await registerCall(data);
    setLoader(false);
    navigation.push('Login');
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: Colors.white}}
      keyboardShouldPersistTaps="handled">
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={styles.brand}>
          <Text
            style={{color: Colors.primary, fontWeight: 'bold', fontSize: 30}}>
            Wish You
          </Text>
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 30}}>
          <Text style={{color: Colors.black, marginTop: 5}}>
            You are one step away to whish your loved ones.
          </Text>
        </View>

        {/**Login form content */}
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          {/**email or mobile */}
          <View style={{marginBottom: 5}}>
            <Text style={{color: Colors.black}}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="John Doe"
              value={data.name}
              onChangeText={text => handleChange('name', text)}
            />
          </View>
          {/**email or mobile */}
          <View style={{marginBottom: 5}}>
            <Text style={{color: Colors.black}}>Email</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="john@gmail.com"
              value={data.email}
              onChangeText={text => handleChange('email', text)}
            />
          </View>

          {/**email or mobile */}
          <View style={{marginBottom: 5}}>
            <Text style={{color: Colors.black}}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="9988999019"
              value={data.phone}
              onChangeText={text => handleChange('phone', text)}
            />
          </View>

          {/**password */}
          <View style={{marginTop: 10}}>
            <Text style={{color: Colors.black}}>Password</Text>
            <TextInput
              secureTextEntry={showPassword}
              style={styles.input}
              placeholderTextColor={Colors.lightBlack}
              placeholder="Your Password"
              value={data.password}
              onChangeText={text => handleChange('password', text)}
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

          {/**button */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 15,
              marginTop: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}
            onPress={handleRegister}>
            {!loader ? (
              <Text
                style={{color: Colors.white, fontWeight: '900', fontSize: 15}}>
                Register
              </Text>
            ) : (
              <ActivityIndicator color={Colors.white} />
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
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.push('Login')}>
              <Text style={{color: Colors?.primary}}>Login</Text>
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
              display: 'none',
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
              marginVertical: 10,
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

export default Register;
