import AbstractSortBySelectorAction from './AbstractSortBySelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';

export default class HideSelectedSortBysAction extends AbstractSortBySelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    return {
      ...currentState,
      areSelectedSortBysShown: false
    };
  }
}
