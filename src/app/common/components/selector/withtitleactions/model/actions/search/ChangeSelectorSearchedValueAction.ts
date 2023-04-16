import type { SelectorWithTitleActionsState } from '../../state/SelectorWithTitleActionsState';
import AbstractSelectorWithTitleActionsAction from '../AbstractSelectorWithTitleActionsAction';
import type { SelectorWithTitleActionsStateNamespace } from '../../state/types/SelectorWithTitleActionsStateNamespace';

// eslint-disable-next-line no-undef
export default class ChangeSelectorSearchedValueAction extends AbstractSelectorWithTitleActionsAction {
  searchedValue: string;

  constructor(stateNamespace: SelectorWithTitleActionsStateNamespace, searchedValue: string) {
    super(stateNamespace);
    this.searchedValue = searchedValue;
  }

  perform(currentState: SelectorWithTitleActionsState): SelectorWithTitleActionsState {
    return {
      ...currentState,
      searchedValue: this.searchedValue
    };
  }
}
