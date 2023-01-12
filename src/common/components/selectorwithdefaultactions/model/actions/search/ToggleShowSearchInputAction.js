// @flow

import HideSelectorSearchInputAction from './HideSelectorSearchInputAction';
import ShowSelectorSearchInputAction from './ShowSelectorSearchInputAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';
import AbstractSelectorWithDefaultActionsAction from '../AbstractSelectorWithDefaultActionsAction';

export default class ToggleShowSearchInputAction extends AbstractSelectorWithDefaultActionsAction {
  performActionAndReturnNewState(
    currentState: SelectorWithDefaultActionsState
  ): SelectorWithDefaultActionsState {
    if (currentState.isSearchInputShown) {
      return this.performAction(new HideSelectorSearchInputAction(this.stateNamespace), currentState);
    } else {
      return this.performAction(new ShowSelectorSearchInputAction(this.stateNamespace), currentState);
    }
  }
}
