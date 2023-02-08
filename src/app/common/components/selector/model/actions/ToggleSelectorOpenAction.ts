import AbstractSelectorAction from './AbstractSelectorAction';
import type { SelectorState } from '../state/SelectorState';

export default class ToggleSelectorOpenAction extends AbstractSelectorAction {
  perform(currentState: SelectorState): SelectorState {
    return {
      ...currentState,
      isSelectorOpen: !currentState.isSelectorOpen
    };
  }
}
