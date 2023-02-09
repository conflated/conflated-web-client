import { AbstractDispatchingAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DashboardsState } from '../state/DashboardsState';
import store from '../../../../../store/store';

export default abstract class AbstractDashboardsPageAction extends AbstractDispatchingAction<DashboardsState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
