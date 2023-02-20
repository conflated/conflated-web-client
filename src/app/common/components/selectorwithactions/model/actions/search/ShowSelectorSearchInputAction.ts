import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';
import type { SelectorWithDefaultActionsState } from '../../state/SelectorWithDefaultActionsState';

export default class ShowSelectorSearchInputAction extends AbstractSelectorWithActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithDefaultActionsState): SelectorWithDefaultActionsState {
    return {
      ...currentState,
      isSearchInputShown: true
    };
  }
}
