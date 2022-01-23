import React from "react";
import {
  View,
  ToastAndroid,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { register } from "../apis/auth/auth";
import Colors from "../config/Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const showToast = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
const psregx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
const emailRgx = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

const registerCall = async ({ name = "", email = "", password = "" }) => {
  if (name.length < 3) {
    showToast("Please enter your name");
    return false;
  }

  if (!emailRgx.test(email)) {
    showToast("Please enter valid email");
    return false;
  }

  if (!psregx.test(password)) {
    showToast(
      "Password should contains at least one capital, special char and number"
    );
    return false;
  }
  if (password.length < 8) {
    showToast("Password should be 8 char");
    return false;
  }
  console.log("register");
  const res = await register({ name, email, password });
  if (res && res.status === 200) {
    showToast("Registered sucessfully");
    return true;
  } else {
    showToast("Unable to register");
    return false;
  }
};

function Register({ navigation }) {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleChange = (key, text) => {
    setData({ ...data, [key]: text });
  };

  const handleRegister = async () => {
    setLoader(true);
    await registerCall(data);
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

export default Register;
