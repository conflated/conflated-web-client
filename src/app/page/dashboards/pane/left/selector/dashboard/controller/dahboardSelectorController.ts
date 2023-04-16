import { Controller } from 'oo-redux-utils2';
import store from '../../../../../../../../store/store';
import { PageStateNamespace } from '../../../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../../../store/AppState';
import selectShownDashboards from './selectors/selectShownDashboards';
import { controller as selectorWithDefaultActionsController } from '../../../../../../../common/components/selector/withtitleactions/controller/selectorWithTitleActionsController';
import { controller as dashboardsPageController } from '../../../../../controller/dashboardsPageController';

class DashboardSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    shownDashboards: selectShownDashboards(appState),
    selectedDashboard: appState.dashboardsPage.dashboardsState.selectedDashboard,
    isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen
  });

  actionDispatchers = {
    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardSelector').toggleMaximizeSelector,

    showDashboard: dashboardsPageController.actionDispatchers.showDashboard
  };
}

export const controller = new DashboardSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
