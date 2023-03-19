import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SelectorWithActionsState } from '../state/SelectorWithActionsState';
import type { SelectorWithActionsStateNamespace } from '../state/types/SelectorWithActionsStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractSelectorWithActionsAction extends AbstractCompositeAction<
  SelectorWithActionsState,
  SelectorWithActionsStateNamespace
> {
  constructor(stateNamespace: SelectorWithActionsStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
