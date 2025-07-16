// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    // {
    //   id: 'login1',
    //   title: 'Login',
    //   type: 'item',
    //   url: '/login',
    //   icon: icons.LoginOutlined,
    //   target: true
    // },
    // {
    //   id: 'register1',
    //   title: 'Register',
    //   type: 'item',
    //   url: '/register',
    //   icon: icons.ProfileOutlined,
    //   target: true
    // },
    {
      id: 'lenders',
      title: 'Lenders',
      type: 'item',
      url: '/lenders',
      icon: icons.ProfileOutlined
    },
    {
      id: 'loans',
      title: 'Loan',
      type: 'item',
      url: '/loans',
      icon: icons.ProfileOutlined
    },
    {
      id: 'Borrowers',
      title: 'Borrowers',
      type: 'item',
      url: '/borrowers',
      icon: icons.ProfileOutlined
    }
  ]
};



export default pages;
