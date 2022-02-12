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

export const getWishCards = async data => {
  try {
    const res = await axios.get(base + Routes.wishYous + data);
    return res;
  } catch (error) {
    console.log('Unable to get wishes', error);
    return null;
  }
};

export const getCard = async data => {
  try {
    const res = await axios.get(base + Routes.userCard + data);
    return res;
  } catch (error) {
    console.log('Unable to get card', error);
    return null;
  }
};

export const deleteCard = async data => {
  try {
    const res = await axios.delete(base + Routes.userCard + data);
    return res;
  } catch (error) {
    console.log('Unable to delete card', error);
    return null;
  }
};
