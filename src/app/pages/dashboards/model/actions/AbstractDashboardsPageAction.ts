import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DashboardsState } from '../state/DashboardsState';
import dispatch from '../../../../../store/dispatch';

export default abstract class AbstractDashboardsPageAction extends AbstractDispatchingAction<DashboardsState> {
  constructor() {
    super('', dispatch);
  }
}
