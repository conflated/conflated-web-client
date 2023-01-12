import { AbstractAction } from 'oo-redux-utils';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';

export default class AbstractDimensionSelectorAction extends AbstractAction<DimensionSelectorState> {
  constructor() {
    super('');
  }
}
