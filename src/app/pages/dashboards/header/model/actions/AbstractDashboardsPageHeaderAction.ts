import { AbstractAction } from 'oo-redux-utils2';
import type { DashboardsPageHeaderState } from '../state/DashboardsPageHeaderState';

export default abstract class AbstractDashboardsPageHeaderAction extends AbstractAction<DashboardsPageHeaderState> {
  constructor() {
    super('');
  }
}
