import type { DispatchAction } from 'oo-redux-utils2';
import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DashboardsState } from '../state/DashboardsState';

export default class AbstractDashboardsPageDispatchingAction extends AbstractDispatchingAction<DashboardsState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
