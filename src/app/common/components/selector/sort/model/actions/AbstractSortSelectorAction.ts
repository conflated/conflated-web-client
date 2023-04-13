import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import type { SortSelectorStateNamespace } from '../state/types/SortSelectorStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractSortSelectorAction extends AbstractCompositeAction<
  SortBySelectorState,
  SortSelectorStateNamespace
> {
  constructor(stateNamespace: SortSelectorStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
