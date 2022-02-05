import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../config/Colors';
import feedbackImage from '../../assets/images/feedback.png';
import {TextInput} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';

function Feedback() {
  const [text, setText] = React.useState('');
  const {width, height} = Dimensions.get('window');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
      <Image
        style={{height: height / 2, width, marginBottom: height / 2}}
        resizeMode="center"
        source={feedbackImage}></Image>
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Wish You</Text>
          <Text style={styles.feedback}>Feedback!😊</Text>
        </View>
        <View
          style={{
            marginVertical: 5,
            paddingHorizontal: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <Entypo name="emoji-sad" color={Colors.lightBlack} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="emoji-neutral" color={Colors.lightBlack} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="emoji-flirt" color={Colors.lightBlack} size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="emoji-happy" color={Colors.primary} size={30} />
          </TouchableOpacity>
        </View>
        <TextInput
          multiline
          style={styles.input}
          placeholder="How's we? Write your feedback..."
          placeholderTextColor={Colors.lightBlack}
        />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 15,
            alignItems: 'center',
            marginTop: 10,
            borderRadius: 30,
          }}>
          <Text style={{fontWeight: 'bold', color: Colors.white}}>
            Submit Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    position: 'absolute',
    top: '30%',
    width: '80%',
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.lightGray,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  title: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: 'bold',
  },
  feedback: {
    color: Colors.black,
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    height: 100,
    borderWidth: 2,
    borderColor: Colors.lightBlack,
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
});

export default Feedback;
