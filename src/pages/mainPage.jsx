import { Page, Color, drawer } from 'tabris';
import { color_heading } from '../config/config';

export function mainPage(username, navigationView) {
    drawer.enabled = true;
    navigationView.drawerActionVisible = true;
    navigationView.titleTextColor = color_heading;
    const page = new Page({ title: 'Welcome, '.concat(username), background: Color.white, autoDispose: true });

    return page;
}
