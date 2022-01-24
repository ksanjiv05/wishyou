import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;
export const createContact = async data => {
  try {
    console.log('req', base + Routes.contact);
    const res = await axios.post(base + Routes.contact, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const getContacts = async query => {
  try {
    console.log('req', base + Routes.contact);
    const res = await axios.get(base + Routes.contact + query);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to register');
    return null;
  }
};

export const searchContact = async query => {
  try {
    console.log('req', base + Routes.contactSearch + query);
    const res = await axios.get(base + Routes.contactSearch + query);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('Unable to process request');
    return null;
  }
};
