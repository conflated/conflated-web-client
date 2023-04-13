import AbstractSortSelectorAction from './AbstractSortSelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';

export default class HideSortsAction extends AbstractSortSelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    return {
      ...currentState,
      areSelectedSortBysShown: false
    };
  }
}
