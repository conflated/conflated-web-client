import AbstractSortBySelectorAction from './AbstractSortBySelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import HideSelectedSortBysAction from './HideSelectedSortBysAction';
import ShowSelectedSortBysAction from './ShowSelectedSortBysAction';

export default class FlashSelectedSortBysBrieflyAction extends AbstractSortBySelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    this.dispatch(new HideSelectedSortBysAction(this.stateNamespace));
    setTimeout(() => this.dispatch(new ShowSelectedSortBysAction('dataExplorerPage')), 1000);
    setTimeout(() => this.dispatch(new HideSelectedSortBysAction('dataExplorerPage')), 2000);
    setTimeout(() => this.dispatch(new ShowSelectedSortBysAction('dataExplorerPage')), 3000);
    return currentState;
  }
}
