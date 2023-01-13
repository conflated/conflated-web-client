import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import type { AppState } from '../../../../../store/AppState';
import DashboardsPageLeftPaneControllerFactory from '../controller/DashboardsPageLeftPaneControllerFactory';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import DashboardsPageLeftPaneViewUtils from './DashboardsPageLeftPaneViewUtils';
import DashboardGroupSelectorView from '../dashboardgroupselector/view/DashboardGroupSelectorView';
import DashboardSelectorView from '../dashboardselector/view/DashboardSelectorView';

const mapAppStateToComponentProps = (appState: AppState) => ({
  isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
  dashboardsPageLeftPaneGutterOffset: appState.common.pageStates.dashboardsPage.pagePaneGutterOffset.leftPane,
  shouldShowDashboardsPageLeftPane: appState.common.pageStates.dashboardsPage.shouldShowPagePane.leftPane,

  shouldShowDashboardsPageLeftPanePermanently:
    appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.leftPane,

  isDashboardGroupSelectorOpen: appState.common.selectorStates.dashboardGroupSelector.isSelectorOpen,
  isDashboardSelectorOpen: appState.common.selectorStates.dashboardSelector.isSelectorOpen
});

const createController = (dispatch: Dispatch) =>
  new DashboardsPageLeftPaneControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DashboardsPageLeftPaneView({
  hideDashboardsPageLeftPane,
  isDashboardGroupSelectorOpen,
  isDashboardSelectorOpen,
  isFullScreenModeActive,
  dashboardsPageLeftPaneGutterOffset,
  shouldShowDashboardsPageLeftPane,
  shouldShowDashboardsPageLeftPanePermanently
}: Props) {
  useEffect(() => {
    function updateSelectorContentHeights() {
      _.before(2, () =>
        DashboardsPageLeftPaneViewUtils.updateSelectorContentHeights(
          isDashboardGroupSelectorOpen,
          isDashboardSelectorOpen
        )
      )();
    }

    updateSelectorContentHeights();
    const timeoutId = setTimeout(() => updateSelectorContentHeights(), 1000);

    return function cleanup() {
      clearTimeout(timeoutId);
    };
  });

  return (
    <PagePaneView
      id="dashboardsPageLeftPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideDashboardsPageLeftPane}
      pane="leftPane"
      paneDefaultWidthCssVarName="dashboards-page-left-pane-default-width"
      paneGutterOffset={dashboardsPageLeftPaneGutterOffset}
      shouldShowPagePane={shouldShowDashboardsPageLeftPane}
      shouldShowPagePanePermanently={shouldShowDashboardsPageLeftPanePermanently}
    >
      <DashboardGroupSelectorView />
      <DashboardSelectorView />
    </PagePaneView>
  );
}

export default connect(mapAppStateToComponentProps, createController)(DashboardsPageLeftPaneView);
