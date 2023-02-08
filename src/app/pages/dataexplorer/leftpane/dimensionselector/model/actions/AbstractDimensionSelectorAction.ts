import { AbstractAction } from 'oo-redux-utils2';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';

export default class AbstractDimensionSelectorAction extends AbstractAction<DimensionSelectorState> {
  constructor() {
    super('');
  }
}
