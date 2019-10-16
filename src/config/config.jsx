import { Font, Color } from 'tabris';
const config = require('../../config.json');

// Fonts
export const font_large = Font.from(config.fonts.font_large);
export const font_info = Font.from(config.fonts.font_info);

// Colors
export const color_heading = Color.from(config.colors.color_heading);
export const color_action = Color.from(config.colors.color_action);
export const color_info = Color.from(config.colors.color_info);
export const color_success = Color.from(config.colors.color_success);
