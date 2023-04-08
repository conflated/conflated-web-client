import { Controller } from 'oo-redux-utils2';
import HidePagePaneAction from '../../../../../common/components/page/model/actions/panevisibility/HidePagePaneAction';
import { PageStateNamespace } from '../../../../../common/components/page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';

class DashboardsPageLeftPaneController extends Controller<PageStateNamespace> {
  getState = (appState: AppState) => ({
    isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
    dragStartPosition: appState.common.pageStates.dashboardsPage.pagePaneGutterPositionOnDragStart.leftPane,
    dashboardsPageLeftPaneGutterOffset: appState.common.pageStates.dashboardsPage.pagePaneGutterOffset.leftPane,
    shouldShowDashboardsPageLeftPane: appState.common.pageStates.dashboardsPage.shouldShowPagePane.leftPane,
    isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen,
    isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen,

    shouldShowDashboardsPageLeftPanePermanently:
      appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane
  });

  actionDispatchers = {
    hideDashboardsPageLeftPane: () => this.dispatch(new HidePagePaneAction('dashboardsPage', 'leftPane'))
  };
}

export const controller = new DashboardsPageLeftPaneController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
