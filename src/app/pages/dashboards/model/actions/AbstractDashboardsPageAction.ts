import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DashboardsPageState } from '../state/DashboardsPageState';
import store from '../../../../../store/store';

export default abstract class AbstractDashboardsPageAction extends AbstractCompositeAction<DashboardsPageState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
