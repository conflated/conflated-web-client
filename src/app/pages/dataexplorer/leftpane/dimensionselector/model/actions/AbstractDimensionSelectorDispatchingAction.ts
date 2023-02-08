import type { DispatchAction } from 'oo-redux-utils2';
import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';

export default class AbstractDimensionSelectorDispatchingAction extends AbstractDispatchingAction<DimensionSelectorState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
