import { Controller } from 'oo-redux-utils2';
import store from '../../../../../store/store';
import { PageStateNamespace } from '../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownDashboards from './model/state/selectors/selectShownDashboards';
import { controller as selectorWithDefaultActionsController } from '../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import { controller as dashboardsPageController } from '../../dashboardsPageController';

class DashboardSelectorController extends Controller<PageStateNamespace> {
  getState(appState: AppState) {
    return {
      shownDashboards: selectShownDashboards(appState),
      selectedDashboard: appState.dashboardsPage.dashboardsState.selectedDashboard,
      isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen
    };
  }

  getActionDispatchers() {
    return {
      toggleMaximizeSelector:
        selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

      showDashboard: dashboardsPageController.getActionDispatchers().showDashboard
    };
  }
}

export const controller = new DashboardSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
