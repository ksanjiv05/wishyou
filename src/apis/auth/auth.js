import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;
export const register = async data => {
  try {
    console.log('req', base + Routes.register);
    const res = await axios.post(base + Routes.register, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const updateFcmToken = async data => {
  try {
    console.log('req', base + Routes.register);
    const res = await axios.put(base + Routes.fcm, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};
