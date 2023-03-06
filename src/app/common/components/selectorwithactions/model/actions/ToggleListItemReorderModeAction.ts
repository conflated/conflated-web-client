import AbstractSelectorWithActionsAction from './AbstractSelectorWithActionsAction';
import { SelectorWithActionsState } from '../state/SelectorWithActionsState';

export default class ToggleListItemReorderModeAction extends AbstractSelectorWithActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithActionsState): SelectorWithActionsState {
    return {
      ...currentState,
      isListItemReorderModeActive: !currentState.isListItemReorderModeActive
    };
  }
}
