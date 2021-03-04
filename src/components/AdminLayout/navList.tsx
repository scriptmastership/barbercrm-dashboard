import { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';

interface Nav {
  path: string;
  title: string;
  Icon: IconType;
}

const navList: Nav[] = [
  {
    path: '/admin/home',
    title: 'Home',
    Icon: FaHome,
  },
  {
    path: '/admin/service',
    title: 'Service',
    Icon: FaClipboardList,
  },
];

export default navList;