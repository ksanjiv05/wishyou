import axios from 'axios';
import Routes from '../../config/Routes';
import {getToken} from '../../utils/token';
const base = Routes.url + Routes.ver;
export const addFeedback = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.feedback, data, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to add feedback');
    return null;
  }
};
