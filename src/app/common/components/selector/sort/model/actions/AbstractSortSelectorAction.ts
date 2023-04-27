import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SortSelectorState } from '../state/SortSelectorState';
import type { SortSelectorStateNamespace } from '../state/types/SortSelectorStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractSortSelectorAction extends AbstractCompositeAction<
  SortSelectorState,
  SortSelectorStateNamespace
> {
  constructor(stateNamespace: SortSelectorStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
