import { Button, TextInput, TextView, contentView, Color, Font, AnimationOptions, CheckBox, NavigationView, Page, drawer } from 'tabris';
import { mainPage } from './pages/mainPage';
import { registerPage } from './pages/registerPage';
import { loginPage } from './pages/loginPage';
import { color_heading, color_info, color_action, font_info } from './config/config';
import { getActionButton, getHeadingText } from './modules/widgets';
import { getTimeOfDay } from './modules/helpers';

import { initializeDrawer } from './modules/widgets';

import { getUserName, api_url } from './modules/api';

const Base64 = require('js-base64').Base64;

const navigationView = new NavigationView({
  layoutData: 'stretch',
  visible: true,
  toolbarColor: Color.white,
  titleTextColor: Color.black,
  actionColor: Color.black,
  drawerActionVisible: false
}).appendTo(contentView);

initializeDrawer(navigationView);
navigationView.append(loginPage(navigationView));




