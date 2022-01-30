import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;

export const saveWishCard = async data => {
  try {
    const res = await axios.post(base + Routes.wishYou, data);
    return res;
  } catch (error) {
    console.log('Unable to Save', error);
    return null;
  }
};
