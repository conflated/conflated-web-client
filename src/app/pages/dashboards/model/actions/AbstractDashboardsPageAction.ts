import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DashboardsState } from '../state/DashboardsState';
import store from '../../../../../store/store';

export default abstract class AbstractDashboardsPageAction extends AbstractCompositeAction<DashboardsState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
