import { AbstractAction } from 'oo-redux-utils';
import type { DashboardsState } from '../state/DashboardsState';

export default class AbstractDashboardsPageAction extends AbstractAction<DashboardsState> {
  constructor() {
    super('');
  }
}
