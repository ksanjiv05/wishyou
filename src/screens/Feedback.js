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
import auth from '@react-native-firebase/auth';
import {addFeedback} from '../apis/feedback/feedback';
import {showToast} from '../utils/toast';
import Loader from '../components/Loader';

function Feedback() {
  const [text, setText] = React.useState('');
  const [rated, setRated] = React.useState(0);
  const {width, height} = Dimensions.get('window');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleFeedBack = async () => {
    if (text.length < 3) {
      showToast('Please provide your feedback!');
      return;
    }
    setIsLoading(true);
    const {email, displayName} = auth().currentUser;
    const responce = await addFeedback({
      feedback: text,
      rated,
      email,
      name: displayName,
    });

    if (responce && responce.status === 200) {
      showToast('Thanks For Your Feedback');
      setText('');
      setIsLoading(false);
    } else {
      showToast('Unable to add feedback!');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader text="Processing..." />}
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
              <Entypo
                name="emoji-sad"
                color={rated === 1 ? Colors.primary : Colors.lightBlack}
                size={30}
                onPress={() => setRated(1)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                name="emoji-neutral"
                color={rated === 2 ? Colors.primary : Colors.lightBlack}
                size={30}
                onPress={() => setRated(2)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                name="emoji-flirt"
                color={rated === 3 ? Colors.primary : Colors.lightBlack}
                size={30}
                onPress={() => setRated(3)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo
                name="emoji-happy"
                color={rated === 4 ? Colors.primary : Colors.lightBlack}
                size={30}
                onPress={() => setRated(4)}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            multiline
            numberOfLines={6}
            style={styles.input}
            placeholder="How's we? Write your feedback..."
            placeholderTextColor={Colors.lightBlack}
            value={text}
            onChangeText={text => setText(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              paddingVertical: 15,
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 30,
            }}
            onPress={handleFeedBack}>
            <Text style={{fontWeight: 'bold', color: Colors.white}}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
    color: Colors.black,
    marginTop: 15,
    padding: 10,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
});

export default Feedback;
