import AbstractSortSelectorAction from './AbstractSortSelectorAction';
import type { SortSelectorState } from '../state/SortSelectorState';
import HideSortsAction from './HideSortsAction';
import ShowSortsAction from './ShowSortsAction';

export default class FlashSortsBrieflyAction extends AbstractSortSelectorAction {
  perform(currentState: SortSelectorState): SortSelectorState {
    this.dispatch(new HideSortsAction(this.stateNamespace));
    setTimeout(() => this.dispatch(new ShowSortsAction('dataExplorerPage')), 400);
    setTimeout(() => this.dispatch(new HideSortsAction('dataExplorerPage')), 800);
    setTimeout(() => this.dispatch(new ShowSortsAction('dataExplorerPage')), 1200);
    setTimeout(() => this.dispatch(new HideSortsAction('dataExplorerPage')), 1600);
    setTimeout(() => this.dispatch(new ShowSortsAction('dataExplorerPage')), 2000);
    return currentState;
  }
}
