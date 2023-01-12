import AbstractSelectorAction from './AbstractSelectorAction';
import type { SelectorState } from '../state/SelectorState';

export default class OpenSelectorAction extends AbstractSelectorAction {
  performActionAndReturnNewState(currentState: SelectorState): SelectorState {
    return {
      ...currentState,
      isSelectorOpen: true
    };
  }
}
