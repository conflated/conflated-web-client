import OOReduxUtils from 'oo-redux-utils2';
import type { DimensionSelectorState } from './DimensionSelectorState';
import AbstractDimensionSelectorAction from '../actions/AbstractDimensionSelectorAction';

const initialDimensionSelectorState: DimensionSelectorState = {
  dimensions: [],
  isFetchingDimensions: false
};

export default OOReduxUtils.createStateReducer<DimensionSelectorState>(
  initialDimensionSelectorState,
  AbstractDimensionSelectorAction
);
