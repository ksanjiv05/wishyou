import axios from 'axios';
import Routes from '../../config/Routes';
import {getToken} from '../../utils/token';
const base = Routes.url + Routes.ver;

export const saveWishCard = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.wishYou, data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to Save', error);
    return null;
  }
};

export const getWishCards = async data => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.wishYous + data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to get wishes', error);
    return null;
  }
};

export const getCard = async data => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.userCard + data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to get card', error);
    return null;
  }
};

export const deleteCard = async data => {
  try {
    const token = await getToken();
    const res = await axios.delete(base + Routes.userCard + data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to delete card', error);
    return null;
  }
};
