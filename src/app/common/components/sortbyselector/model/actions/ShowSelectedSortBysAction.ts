import AbstractSortBySelectorAction from './AbstractSortBySelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';

export default class ShowSelectedSortBysAction extends AbstractSortBySelectorAction {
  performActionAndReturnNewState(currentState: SortBySelectorState): SortBySelectorState {
    return {
      ...currentState,
      areSelectedSortBysShown: true
    };
  }
}
