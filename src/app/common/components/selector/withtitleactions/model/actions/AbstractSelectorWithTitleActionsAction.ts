import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SelectorWithTitleActionsState } from '../state/SelectorWithTitleActionsState';
import type { SelectorWithTitleActionsStateNamespace } from '../state/types/SelectorWithTitleActionsStateNamespace';
import store from '../../../../../../../store/store';

export default abstract class AbstractSelectorWithTitleActionsAction extends AbstractCompositeAction<
  SelectorWithTitleActionsState,
  SelectorWithTitleActionsStateNamespace
> {
  constructor(stateNamespace: SelectorWithTitleActionsStateNamespace) {
    super(stateNamespace, createActionDispatcher(store.dispatch));
  }
}
