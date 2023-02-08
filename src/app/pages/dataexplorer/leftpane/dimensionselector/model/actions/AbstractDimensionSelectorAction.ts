import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import dispatch from '../../../../../../../store/dispatch';

export default abstract class AbstractDimensionSelectorAction extends AbstractDispatchingAction<DimensionSelectorState> {
  constructor() {
    super('', dispatch);
  }
}
