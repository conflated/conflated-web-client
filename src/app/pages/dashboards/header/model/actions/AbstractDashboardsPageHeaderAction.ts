import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DashboardsPageHeaderState } from '../state/DashboardsPageHeaderState';
import store from '../../../../../../store/store';

export default abstract class AbstractDashboardsPageHeaderAction extends AbstractCompositeAction<DashboardsPageHeaderState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
