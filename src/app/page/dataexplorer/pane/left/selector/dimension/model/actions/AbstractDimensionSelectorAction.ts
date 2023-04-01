import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DimensionSelectorState } from '../state/DimensionSelectorState';
import store from '../../../../../../../../../store/store';

export default abstract class AbstractDimensionSelectorAction extends AbstractCompositeAction<DimensionSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
