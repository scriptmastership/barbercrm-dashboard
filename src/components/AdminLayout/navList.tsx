import { IconType } from 'react-icons';
import { FaHome, FaClipboardList } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import { BsCalendar, BsBriefcase } from 'react-icons/bs';
import { IoNotificationsOutline } from 'react-icons/io5';
import { GoTasklist } from 'react-icons/go';
import { AiOutlinePrinter } from 'react-icons/ai';

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
    path: '/admin/calendar',
    title: 'Calendar',
    Icon: BsCalendar,
  },
  {
    path: '/admin/program',
    title: 'Program',
    Icon: GoTasklist,
  },
  {
    path: '/admin/team',
    title: 'Team',
    Icon: BsBriefcase,
  },
  {
    path: '/admin/service',
    title: 'Service',
    Icon: FaClipboardList,
  },

  {
    path: '/admin/client',
    title: 'Client',
    Icon: TiGroup,
  },
  {
    path: '/admin/notification',
    title: 'Notification',
    Icon: IoNotificationsOutline,
  },
  {
    path: '/admin/print',
    title: 'Print',
    Icon: AiOutlinePrinter,
  },
];

export default navList;