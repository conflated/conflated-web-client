import HideSelectorSearchInputAction from './HideSelectorSearchInputAction';
import ShowSelectorSearchInputAction from './ShowSelectorSearchInputAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';
import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';

export default class ToggleShowSearchInputAction extends AbstractSelectorWithActionsAction {
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    if (currentState.isSearchInputShown) {
      return this.performAction(new HideSelectorSearchInputAction(this.stateNamespace), currentState);
    } else {
      return this.performAction(new ShowSelectorSearchInputAction(this.stateNamespace), currentState);
    }
  }
}
