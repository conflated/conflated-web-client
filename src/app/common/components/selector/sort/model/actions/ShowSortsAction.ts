import AbstractSortSelectorAction from './AbstractSortSelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';

export default class ShowSortsAction extends AbstractSortSelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    return {
      ...currentState,
      areSelectedSortBysShown: true
    };
  }
}
