import auth from '@react-native-firebase/auth';

export const getToken = async () => {
  const token = await auth().currentUser.getIdToken();
  return token;
};
