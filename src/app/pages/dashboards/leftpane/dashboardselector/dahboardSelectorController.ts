import Controller from '../../../../../Controller';
import store from '../../../../../store/store';
import { PageStateNamespace } from '../../../../common/components/page/model/state/namespace/PageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownDashboards from './model/state/selectors/selectShownDashboards';

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
      toggleMaximizeSelector: new SelectorWithDefaultActionsController(this.dispatch).getActionDispatchers(
        'dashboardGroupSelector'
      ).toggleMaximizeSelector,

      showDashboard: new DashboardsPageController(this.dispatch).getActionDispatchers().showDashboardGroup
    };
  }
}

export const controller = new DashboardSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
