import AbstractSelectorWithTitleActionsAction from '../AbstractSelectorWithTitleActionsAction';
import type { SelectorWithTitleActionsState } from '../../state/SelectorWithTitleActionsState';

export default class HideSelectorSearchInputAction extends AbstractSelectorWithTitleActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithTitleActionsState): SelectorWithTitleActionsState {
    return {
      ...currentState,
      isSearchInputShown: false,
      searchedValue: ''
    };
  }
}
