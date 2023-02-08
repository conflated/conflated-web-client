import AbstractSelectorWithDefaultActionsAction from '../AbstractSelectorWithDefaultActionsAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';

export default class ShowSelectorSearchInputAction extends AbstractSelectorWithDefaultActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSearchInputShown: true
    };
  }
}
