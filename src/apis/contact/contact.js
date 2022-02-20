import axios from 'axios';
import Routes from '../../config/Routes';
import {getToken} from '../../utils/token';
const base = Routes.url + Routes.ver;
export const createContact = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.contact, data, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to add contact');
    return null;
  }
};

export const getContacts = async query => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.contacts + query, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to get contacts');
    return null;
  }
};

export const searchContact = async query => {
  try {
    const token = await getToken();
    const res = await axios.get(base + Routes.contactSearch + query, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to search  contact');
    return null;
  }
};

export const searchAndAddContact = async data => {
  try {
    const token = await getToken();
    const res = await axios.post(base + Routes.contactSearch, data, {
      headers: {
        'x-access-token': token,
      },
    });
    // console.log('responce ', res.data.msg);
    return res;
  } catch (error) {
    console.log('Unable to process request');
    return null;
  }
};
