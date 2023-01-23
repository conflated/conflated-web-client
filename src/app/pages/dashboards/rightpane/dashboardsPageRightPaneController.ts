import HidePagePaneAction from '../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';
import { AppState } from '../../../../store/AppState';
import Controller from '../../../../Controller';
import { PageStateNamespace } from '../../../common/components/page/model/state/namespace/PageStateNamespace';
import store from '../../../../store/store';

class DashboardsPageRightPaneController extends Controller<PageStateNamespace> {
  getState(appState: AppState) {
    return {
      isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
      dashboardsPageRightPaneGutterOffset: appState.common.pageStates.dashboardsPage.pagePaneGutterOffset.rightPane,
      shouldShowDashboardsPageRightPane: appState.common.pageStates.dashboardsPage.shouldShowPagePane.rightPane,

      shouldShowDashboardsPageRightPanePermanently:
        appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.rightPane
    };
  }

  getActionDispatchers() {
    return {
      hideDashboardsPageRightPane: () => this.dispatch(new HidePagePaneAction('dashboardsPage', 'rightPane'))
    };
  }
}

export const controller = new DashboardsPageRightPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
