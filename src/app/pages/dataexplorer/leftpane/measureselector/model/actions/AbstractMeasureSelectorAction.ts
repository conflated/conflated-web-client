import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';
import dispatch from '../../../../../../../store/dispatch';

export default abstract class AbstractMeasureSelectorAction extends AbstractDispatchingAction<MeasureSelectorState> {
  constructor() {
    super('', dispatch);
  }
}
