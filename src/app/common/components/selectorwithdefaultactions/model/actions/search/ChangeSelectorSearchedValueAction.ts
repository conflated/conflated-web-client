import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';
import AbstractSelectorWithDefaultActionsAction from '../AbstractSelectorWithDefaultActionsAction';
import type { SelectorWithDefaultActionsStateNamespace } from '../../state/types/SelectorWithDefaultActionsStateNamespace';

// eslint-disable-next-line no-undef
export default class ChangeSelectorSearchedValueAction extends AbstractSelectorWithDefaultActionsAction {
  searchedValue: string;

  constructor(stateNamespace: SelectorWithDefaultActionsStateNamespace, searchedValue: string) {
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
