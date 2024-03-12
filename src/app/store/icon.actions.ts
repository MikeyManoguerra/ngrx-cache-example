import { createAction, props } from '@ngrx/store';
import { Icon } from '../models/icon';
import { IconType } from './state';

export const iconFetched = createAction('Icon Fetched', props<{ icon: Icon, iconType: IconType }>());
