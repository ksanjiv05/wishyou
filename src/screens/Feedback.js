import React from "react";
import { View } from "react-native";
import Colors from "../config/Colors";

function Feedback() {
  const [text, setText] = React.useState("");
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        // alignItems: 'center',
        justifyContent: "center",
      }}
    ></View>
  );
}

export default Feedback;
