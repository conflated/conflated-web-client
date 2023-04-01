import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import { DashboardGroupSelectorState } from '../state/DashboardGroupSelectorState';
import store from '../../../../../../../../../store/store';

export default abstract class AbstractDashboardGroupSelectorAction extends AbstractCompositeAction<DashboardGroupSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
