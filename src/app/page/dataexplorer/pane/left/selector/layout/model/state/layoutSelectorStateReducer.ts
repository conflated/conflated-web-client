import OOReduxUtils from 'oo-redux-utils2';
import type { LayoutSelectorState } from './LayoutSelectorState';
import AbstractLayoutSelectorAction from '../actions/AbstractLayoutSelectorAction';

const initialLayoutSelectorState: LayoutSelectorState = {
  isLayoutLocked: false
};

export default OOReduxUtils.createStateReducer<LayoutSelectorState>(
  initialLayoutSelectorState,
  AbstractLayoutSelectorAction
);
