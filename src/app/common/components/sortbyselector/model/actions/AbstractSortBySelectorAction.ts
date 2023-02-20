import { AbstractDispatchingAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import type { SortBySelectorPageStateNamespace } from '../state/types/SortBySelectorPageStateNamespace';
import store from '../../../../../../store/store';

export default abstract class AbstractSortBySelectorAction extends AbstractDispatchingAction<
  SortBySelectorState,
  SortBySelectorPageStateNamespace
> {
  constructor(pageStateNamespace: SortBySelectorPageStateNamespace) {
    super(pageStateNamespace, createActionDispatcher(store.dispatch));
  }
}
