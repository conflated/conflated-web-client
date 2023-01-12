import { AbstractAction } from 'oo-redux-utils';
import type { DashboardsPageHeaderState } from '../state/DashboardsPageHeaderState';

export default class AbstractDashboardsPageHeaderAction extends AbstractAction<DashboardsPageHeaderState> {
  constructor() {
    super('');
  }
}
