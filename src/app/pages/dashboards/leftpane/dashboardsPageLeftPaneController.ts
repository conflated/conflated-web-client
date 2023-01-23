import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';
import Controller from '../../../../Controller';
import { PageStateNamespace } from '../../../common/components/page/model/state/namespace/PageStateNamespace';
import store from '../../../../store/store';
import { AppState } from '../../../../store/AppState';

class DashboardsPageLeftPaneController extends Controller<PageStateNamespace> {
  getState(appState: AppState) {
    return {
      isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
      dashboardsPageLeftPaneGutterOffset: appState.common.pageStates.dashboardsPage.pagePaneGutterOffset.leftPane,
      shouldShowDashboardsPageLeftPane: appState.common.pageStates.dashboardsPage.shouldShowPagePane.leftPane,

      shouldShowDashboardsPageLeftPanePermanently:
        appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane,

      isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen,
      isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen
    };
  }

  getActionDispatchers() {
    return {
      hideDashboardsPageLeftPane: () => this.dispatch(new HidePagePaneAction('dashboardsPage', 'leftPane'))
    };
  }
}

export const controller = new DashboardsPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
