import type { SelectorWithActionsState } from '../../state/SelectorWithActionsState';
import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';
import type { SelectorWithActionsStateNamespace } from '../../state/types/SelectorWithActionsStateNamespace';

// eslint-disable-next-line no-undef
export default class ChangeSelectorSearchedValueAction extends AbstractSelectorWithActionsAction {
  searchedValue: string;

  constructor(stateNamespace: SelectorWithActionsStateNamespace, searchedValue: string) {
    super(stateNamespace);
    this.searchedValue = searchedValue;
  }

  perform(currentState: SelectorWithActionsState): SelectorWithActionsState {
    return {
      ...currentState,
      searchedValue: this.searchedValue
    };
  }
}
