import type { DispatchAction } from 'oo-redux-utils2';
import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';

export default class AbstractMeasureSelectorDispatchingAction extends AbstractDispatchingAction<MeasureSelectorState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
