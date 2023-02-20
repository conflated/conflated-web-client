import AbstractSelectorWithActionsAction from './AbstractSelectorWithActionsAction';
import type { SelectorWithDefaultActionsState } from '../state/SelectorWithDefaultActionsState';

export default class ToggleMaximizeSelectorAction extends AbstractSelectorWithActionsAction {
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSelectorMaximized: !currentState.isSelectorMaximized
    };
  }
}
