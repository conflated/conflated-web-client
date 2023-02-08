import AbstractSortBySelectorAction from './AbstractSortBySelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';

export default class ShowSelectedSortBysAction extends AbstractSortBySelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    return {
      ...currentState,
      areSelectedSortBysShown: true
    };
  }
}
