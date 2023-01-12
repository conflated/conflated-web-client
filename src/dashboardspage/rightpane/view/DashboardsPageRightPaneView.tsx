import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import type { AppState } from '../../../store/AppState';
import DashboardsPageRightPaneControllerFactory from '../controller/DashboardsPageRightPaneControllerFactory';
import PagePaneView from '../../../common/view/pagepane/PagePaneView';
import FilterSelectorView from '../../../common/components/filterselector/view/FilterSelectorView';
import SortBySelectorView from '../../../common/components/sortbyselector/view/SortBySelectorView';

const mapAppStateToComponentProps = (appState: AppState) => ({
  isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
  dashboardsPageRightPaneGutterOffset: appState.common.pageStates.dashboardsPage.pagePaneGutterOffset.rightPane,
  shouldShowDashboardsPageRightPane: appState.common.pageStates.dashboardsPage.shouldShowPagePane.rightPane,

  shouldShowDashboardsPageRightPanePermanently:
    appState.common.pageStates.dashboardsPage.shouldShowPagePanePermanently.rightPane
});

const createController = (dispatch: Dispatch) =>
  new DashboardsPageRightPaneControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DashboardsPageRightPaneView({
  hideDashboardsPageRightPane,
  isFullScreenModeActive,
  dashboardsPageRightPaneGutterOffset,
  shouldShowDashboardsPageRightPane,
  shouldShowDashboardsPageRightPanePermanently
}: Props) {
  return (
    <PagePaneView
      id="dashboardsPageRightPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideDashboardsPageRightPane}
      pane="rightPane"
      paneDefaultWidthCssVarName="dashboards-page-right-pane-default-width"
      paneGutterOffset={dashboardsPageRightPaneGutterOffset}
      shouldShowPagePane={shouldShowDashboardsPageRightPane}
      shouldShowPagePanePermanently={shouldShowDashboardsPageRightPanePermanently}
    >
      <FilterSelectorView pageStateNamespace="dashboardsPage" />
      <SortBySelectorView pageStateNamespace="dashboardsPage" />
    </PagePaneView>
  );
}

export default connect(mapAppStateToComponentProps, createController)(DashboardsPageRightPaneView);
