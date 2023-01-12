import { AbstractAction } from 'oo-redux-utils';
import type { MeasureSelectorState } from '../state/MeasureSelectorState';

export default class AbstractMeasureSelectorAction extends AbstractAction<MeasureSelectorState> {
  constructor() {
    super('');
  }
}
