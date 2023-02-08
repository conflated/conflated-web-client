import AbstractSelectorWithDefaultActionsAction from '../AbstractSelectorWithDefaultActionsAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';

export default class HideSelectorSearchInputAction extends AbstractSelectorWithDefaultActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSearchInputShown: false,
      searchedValue: ''
    };
  }
}
