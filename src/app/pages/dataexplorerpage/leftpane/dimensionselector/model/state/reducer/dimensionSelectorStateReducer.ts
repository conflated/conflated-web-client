import OOReduxUtils from 'oo-redux-utils';
import type { DimensionSelectorState } from '../DimensionSelectorState';
import AbstractDimensionSelectorAction from '../../actions/AbstractDimensionSelectorAction';
import AbstractDimensionSelectorDispatchingAction from '../../actions/AbstractDimensionSelectorDispatchingAction';

const initialDimensionSelectorState: DimensionSelectorState = {
  dimensions: [],
  isFetchingDimensions: false,
};

export default OOReduxUtils.createStateReducer<DimensionSelectorState>(initialDimensionSelectorState, [
  AbstractDimensionSelectorAction,
  AbstractDimensionSelectorDispatchingAction,
]);
