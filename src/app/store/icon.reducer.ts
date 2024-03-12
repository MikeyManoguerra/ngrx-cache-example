import { createReducer, on } from '@ngrx/store';

import { buildIcon } from '../models/icon';
import { iconFetched } from './icon.actions';
import { IconState } from './state';

export const initialState : IconState = {
  refreshingIcon: buildIcon(),
  expiringIcon: buildIcon(),
};

export const iconReducer = createReducer(
  initialState,
  on(iconFetched, (state, { icon, iconType }) => ({ ...state, [iconType]: icon })),
);
export { IconState };

