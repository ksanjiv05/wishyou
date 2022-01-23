import React from "react";
import {
  TextInput,
  Text,
  View,
  Pressable,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import Colors from "../config/Colors";
import { showToast } from "../utils/toast";

const loginCall = async ({ email = "", password = "" }, navigation) => {
  if (email.length < 5) {
    showToast("Please enter registred email");
    return false;
  }
  if (password.length < 5) {
    showToast("Please enter your password");
    return false;
  }
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // console.log('User account created & signed in!');
      showToast("You are successfully logedin");
      // navigation.navigate('Tab');
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        console.log("user not found");
        showToast("User not found! Please register");
        return;
      }
      showToast("Invalid creadantial");
      console.log(error.code);
    });
};

const handleForget = (email) => {
  // setLoginState(false);
  if (email.length < 5) {
    showToast("Please enter registred email");
    return false;
  }
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      showToast("Reset link successfully send to your email");
      console.log("link send");
    })
    .catch((error) => {
      showToast("Unable to send reset link");
      console.log(error.code);
    });
};

function Login({ navigation }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = React.useState(false);
  const [loginState, setLoginState] = React.useState(true);

  const handleChange = (key, text) => {
    setData({ ...data, [key]: text });
  };

  const handleLogin = () => {
    console.log("login call");
    setLoader(true);
    loginCall(data, navigation);
    setLoader(false);
  };
  return <View style={{ flex: 1, backgroundColor: Colors.primary }}></View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 30,
    marginTop: "22%",
    flex: 1,
  },
  input: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%",
  },
});

export default Login;
