import type { DispatchAction } from 'oo-redux-utils';
import { AbstractDispatchingAction } from 'oo-redux-utils';
import type { DashboardsState } from '../state/DashboardsState';

export default class AbstractDashboardsPageDispatchingAction extends AbstractDispatchingAction<DashboardsState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
