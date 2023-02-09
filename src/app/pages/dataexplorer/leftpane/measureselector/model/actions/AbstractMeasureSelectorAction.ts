import { AbstractDispatchingAction, createActionDispatcher } from 'oo-redux-utils2';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import store from '../../../../../../../store/store';

export default abstract class AbstractMeasureSelectorAction extends AbstractDispatchingAction<MeasureSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
