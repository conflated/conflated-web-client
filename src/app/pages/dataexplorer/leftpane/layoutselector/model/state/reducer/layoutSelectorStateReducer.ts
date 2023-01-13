import OOReduxUtils from 'oo-redux-utils';
import type { LayoutSelectorState } from '../LayoutSelectorState';
import AbstractLayoutSelectorAction from '../../actions/AbstractLayoutSelectorAction';

const initialLayoutSelectorState: LayoutSelectorState = {
  isLayoutLocked: false,
};

export default OOReduxUtils.createStateReducer<LayoutSelectorState>(initialLayoutSelectorState, [
  AbstractLayoutSelectorAction,
  undefined,
]);
