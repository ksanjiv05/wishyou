import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;
export const addFeedback = async data => {
  try {
    console.log('req feedback', base + Routes.feedback);
    const res = await axios.post(base + Routes.feedback, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to add feedback');
    return null;
  }
};
