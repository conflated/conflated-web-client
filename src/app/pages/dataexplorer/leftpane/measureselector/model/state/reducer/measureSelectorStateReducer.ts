import OOReduxUtils from 'oo-redux-utils2';
import type { MeasureSelectorState } from '../MeasureSelectorState';
import AbstractMeasureSelectorAction from '../../actions/AbstractMeasureSelectorAction';
import AbstractMeasureSelectorDispatchingAction from '../../actions/AbstractMeasureSelectorDispatchingAction';

const initialMeasureSelectorState: MeasureSelectorState = {
  measures: [],
  isFetchingMeasures: false
};

export default OOReduxUtils.createStateReducer<MeasureSelectorState>(initialMeasureSelectorState, [
  AbstractMeasureSelectorAction,
  AbstractMeasureSelectorDispatchingAction
]);
