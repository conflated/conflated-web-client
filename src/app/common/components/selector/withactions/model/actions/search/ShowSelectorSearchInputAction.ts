import AbstractSelectorWithActionsAction from '../AbstractSelectorWithActionsAction';
import type { SelectorWithActionsState } from '../../state/SelectorWithActionsState';

export default class ShowSelectorSearchInputAction extends AbstractSelectorWithActionsAction {
  // noinspection JSMethodCanBeStatic
  perform(currentState: SelectorWithActionsState): SelectorWithActionsState {
    return {
      ...currentState,
      isSearchInputShown: true
    };
  }
}
