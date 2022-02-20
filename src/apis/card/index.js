import axios from 'axios';
import Routes from '../../config/Routes';
import {getToken} from '../../utils/token';
const base = Routes.url + Routes.ver;

export const saveCard = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.userCard, data, {
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

export const getCards = async () => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.cardS, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable get cards', error);
    return null;
  }
};

export const likeCard = async data => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.like + data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to like card', error);
    return null;
  }
};

export const searchCards = async data => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.search + data, {
      headers: {
        'x-access-token': token,
      },
    });
    return res;
  } catch (error) {
    console.log('Unable to like card', error);
    return null;
  }
};
