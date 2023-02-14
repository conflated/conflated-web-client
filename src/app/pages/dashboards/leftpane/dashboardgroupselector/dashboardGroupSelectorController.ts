import ToggleShouldShowPagePanePermanentlyAction from '../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import Controller from '../../../../../Controller';
import store from '../../../../../store/store';
import { PageStateNamespace } from '../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownDashboardGroups from './model/state/selectors/selectShownDashboardGroups';
import { controller as selectorWithDefaultActionsController } from '../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';
import { controller as dashboardsPageController } from '../../dashboardsPageController';

class DashboardGroupSelectorController extends Controller<PageStateNamespace> {
  getState(appState: AppState) {
    return {
      shownDashboardGroups: selectShownDashboardGroups(appState),
      selectedDashboardGroup: appState.dashboardsPage.dashboardsState.selectedDashboardGroup,
      isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen,

      shouldShowDashboardsPageLeftPanePermanently:
        appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane
    };
  }

  getActionDispatchers() {
    return {
      toggleShouldShowDashboardsPageLeftPanePermanently: () =>
        this.dispatch(new ToggleShouldShowPagePanePermanentlyAction('dashboardsPage', 'leftPane')),

      toggleMaximizeSelector:
        selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

      showDashboardGroup: dashboardsPageController.getActionDispatchers().showDashboardGroup
    };
  }
}

export const controller = new DashboardGroupSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
