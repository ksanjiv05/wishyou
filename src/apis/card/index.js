import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;

export const saveCard = async data => {
  try {
    const res = await axios.post(base + Routes.userCard, data);
    return res;
  } catch (error) {
    console.log('Unable to Save', error);
    return null;
  }
};

export const getCards = async data => {
  try {
    console.log('reqcards ');
    const res = await axios.get(base + Routes.cardS, data);
    console.log('cards ', res.data);
    return res;
  } catch (error) {
    console.log('Unable get cards', error);
    return null;
  }
};
