import HideSelectorSearchInputAction from './HideSelectorSearchInputAction';
import ShowSelectorSearchInputAction from './ShowSelectorSearchInputAction';
import type { SelectorWithTitleActionsState } from '../../state/SelectorWithTitleActionsState';
import AbstractSelectorWithTitleActionsAction from '../AbstractSelectorWithTitleActionsAction';

export default class ToggleShowSearchInputAction extends AbstractSelectorWithTitleActionsAction {
  perform(currentState: SelectorWithTitleActionsState): SelectorWithTitleActionsState {
    if (currentState.isSearchInputShown) {
      return this.performAction(new HideSelectorSearchInputAction(this.stateNamespace), currentState);
    } else {
      return this.performAction(new ShowSelectorSearchInputAction(this.stateNamespace), currentState);
    }
  }
}
