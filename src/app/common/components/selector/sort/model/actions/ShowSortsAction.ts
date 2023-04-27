import AbstractSortSelectorAction from './AbstractSortSelectorAction';
import type { SortSelectorState } from '../state/SortSelectorState';

export default class ShowSortsAction extends AbstractSortSelectorAction {
  perform(currentState: SortSelectorState): SortSelectorState {
    return {
      ...currentState,
      sortsAreShown: true
    };
  }
}
