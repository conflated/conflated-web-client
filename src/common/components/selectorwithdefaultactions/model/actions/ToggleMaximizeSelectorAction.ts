import AbstractSelectorWithDefaultActionsAction from './AbstractSelectorWithDefaultActionsAction';
import type { SelectorWithDefaultActionsState } from '../state/SelectorWithDefaultActionsState';

export default class ToggleMaximizeSelectorAction extends AbstractSelectorWithDefaultActionsAction {
  performActionAndReturnNewState(
    currentState: SelectorWithDefaultActionsState
  ): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSelectorMaximized: !currentState.isSelectorMaximized
    };
  }
}
