import axios from 'axios';
import Routes from '../../config/Routes';
import {getToken} from '../../utils/token';
const base = Routes.url + Routes.ver;
export const register = async data => {
  try {
    // console.log('req', base + Routes.user);
    const res = await axios.post(base + Routes.user, data);
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const updateFcmToken = async data => {
  try {
    // console.log('fcm', base + Routes.user);
    const res = await axios.put(base + Routes.fcm, data);
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

//update user data pass these key objects
//       email,
//       phone,
//       name,
//       address = "",
//       city = "",
//       state = "",
//       country = "",
//       zip = "",
//       uid,

export const updateUser = async data => {
  try {
    const token = await getToken();
    const res = await axios.put(base + Routes.user, data, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const picUpdate = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.picUpdate, data, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to update pic');
    return null;
  }
};
