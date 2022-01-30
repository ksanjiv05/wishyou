import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;

export const saveCard = async data => {
  try {
    const res = await axios.post(base + Routes.userCard, data);
    return res;
  } catch (error) {
    console.log('Unable to Save');
    return null;
  }
};
