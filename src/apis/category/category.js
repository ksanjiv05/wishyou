import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;

export const getCategories = async data => {
  try {
    console.log('reqCategories ');
    const res = await axios.get(base + Routes.categories, data);
    // console.log('categories ', res.data);
    return res;
  } catch (error) {
    console.log('Unable get categories', error);
    return null;
  }
};
