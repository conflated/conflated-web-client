import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';

export default class HideSelectorSearchInputAction extends AbstractSelectorWithActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSearchInputShown: false,
      searchedValue: ''
    };
  }
}
