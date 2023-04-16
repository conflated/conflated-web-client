import AbstractSelectorWithTitleActionsAction from './AbstractSelectorWithTitleActionsAction';
import { SelectorWithTitleActionsState } from '../state/SelectorWithTitleActionsState';

export default class ToggleListItemReorderModeAction extends AbstractSelectorWithTitleActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithTitleActionsState): SelectorWithTitleActionsState {
    return {
      ...currentState,
      isListItemReorderModeActive: !currentState.isListItemReorderModeActive
    };
  }
}
