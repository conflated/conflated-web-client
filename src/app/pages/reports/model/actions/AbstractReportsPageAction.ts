import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import store from '../../../../../store/store';
import { ReportsPageState } from '../state/ReportsPageState';

export default abstract class AbstractReportsPageAction extends AbstractCompositeAction<ReportsPageState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
