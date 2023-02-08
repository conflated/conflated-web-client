import { AbstractAction } from 'oo-redux-utils2';
import type { DashboardsState } from '../state/DashboardsState';

export default class AbstractDashboardsPageAction extends AbstractAction<DashboardsState> {
  constructor() {
    super('');
  }
}
