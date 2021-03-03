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
    path: '/admin',
    title: 'Home',
    Icon: FaHome,
  },
  {
    path: '/admin/services',
    title: 'Services',
    Icon: FaClipboardList,
  },
];

export default navList;