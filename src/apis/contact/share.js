import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;
export const createShareLink = async data => {
  try {
    console.log('req', base + Routes.share);
    const res = await axios.post(base + Routes.share, data);

    return res;
  } catch (error) {
    console.log('Error to create link');
    return null;
  }
};

export const getShare = async data => {
  try {
    console.log('req', base + Routes.share);
    const res = await axios.post(base + Routes.share, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const validateLinkAndAddContact = async data => {
  try {
    console.log('req', base + Routes.share);
    const res = await axios.post(base + Routes.vshare, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};
