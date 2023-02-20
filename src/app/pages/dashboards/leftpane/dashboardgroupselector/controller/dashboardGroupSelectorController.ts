import { Controller } from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../../common/components/page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import store from '../../../../../../store/store';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import { AppState } from '../../../../../../store/AppState';
import selectShownDashboardGroups from './selectors/selectShownDashboardGroups';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selectorwithactions/controller/selectorWithActionsController';
import { controller as dashboardsPageController } from '../../../controller/dashboardsPageController';

class DashboardGroupSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    shownDashboardGroups: selectShownDashboardGroups(appState),
    selectedDashboardGroup: appState.dashboardsPage.dashboardsState.selectedDashboardGroup,
    isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen,

    shouldShowDashboardsPageLeftPanePermanently:
      appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane
  });

  actionDispatchers = {
    toggleShouldShowDashboardsPageLeftPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction('dashboardsPage', 'leftPane')),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dashboardGroupSelector').toggleMaximizeSelector,

    showDashboardGroup: dashboardsPageController.actionDispatchers.showDashboardGroup
  };
}

export const controller = new DashboardGroupSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
