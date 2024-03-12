import { Color, initColor } from "../models/color";
import { Icon } from "../models/icon";


export type IconType = 'refreshingIcon' | 'expiringIcon';

export class ColorState {
  constructor() {
    this.themeColors = [];
    this.currentColor = initColor();
  }

  themeColors: ReadonlyArray<Color>;
  currentColor: Color;
}


export interface IconState {
  refreshingIcon: Icon;
  expiringIcon: Icon;
}

export interface SettingsState {
  notificationsActive: boolean;
  animationsActive: boolean;
}
