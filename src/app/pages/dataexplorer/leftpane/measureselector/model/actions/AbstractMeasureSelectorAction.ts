import { AbstractAction } from 'oo-redux-utils2';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';

export default class AbstractMeasureSelectorAction extends AbstractAction<MeasureSelectorState> {
  constructor() {
    super('');
  }
}
