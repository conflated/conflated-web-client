import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';
import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';
import type { SelectorWithActionsStateNamespace } from '../../state/types/SelectorWithActionsStateNamespace';

// eslint-disable-next-line no-undef
export default class ChangeSelectorSearchedValueAction extends AbstractSelectorWithActionsAction {
  searchedValue: string;

  constructor(stateNamespace: SelectorWithActionsStateNamespace, searchedValue: string) {
    super(stateNamespace);
    this.searchedValue = searchedValue;
  }

  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      searchedValue: this.searchedValue
    };
  }
}
