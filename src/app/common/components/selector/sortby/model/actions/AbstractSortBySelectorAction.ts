import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import type { SortBySelectorStateNamespace } from '../state/types/SortBySelectorStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractSortBySelectorAction extends AbstractCompositeAction<
  SortBySelectorState,
  SortBySelectorStateNamespace
> {
  constructor(stateNamespace: SortBySelectorStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
