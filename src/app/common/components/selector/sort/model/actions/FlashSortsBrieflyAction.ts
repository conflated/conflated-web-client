import AbstractSortSelectorAction from './AbstractSortSelectorAction';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import HideSortsAction from './HideSortsAction';
import ShowSortsAction from './ShowSortsAction';

export default class FlashSortsBrieflyAction extends AbstractSortSelectorAction {
  perform(currentState: SortBySelectorState): SortBySelectorState {
    this.dispatch(new HideSortsAction(this.stateNamespace));
    setTimeout(() => this.dispatch(new ShowSortsAction('dataExplorerPage')), 1000);
    setTimeout(() => this.dispatch(new HideSortsAction('dataExplorerPage')), 2000);
    setTimeout(() => this.dispatch(new ShowSortsAction('dataExplorerPage')), 3000);
    return currentState;
  }
}
