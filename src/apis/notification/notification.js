import axios from 'axios';
import Routes from '../../config/Routes';
const base = Routes.url + Routes.ver;

export const getNotifications = async data => {
  try {
    // console.log('noti ');
    const res = await axios.get(base + Routes.notifications + data);
    // console.log('notification ', res.data);
    return res;
  } catch (error) {
    console.log('Unable get notification', error);
    return null;
  }
};
