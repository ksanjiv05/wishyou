import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;
export const createEntity = async data => {
  try {
    console.log('req', base + Routes.entity);
    const res = await axios.post(base + Routes.entity, data);
    console.log('responce ', res.data);
    return res;
  } catch (error) {
    console.log('unable to add entite');
    return null;
  }
};

export const getEntites = async query => {
  try {
    const res = await axios.get(`${base}${Routes.entity}${query}`);
    return res;
  } catch (error) {
    console.log('unable get entites');
    return null;
  }
};
