import React from 'react';
import { connect } from 'react-redux';
import type { AppState } from '../../../../../store/AppState';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import FilterSelectorView from '../../../../common/components/filterselector/view/FilterSelectorView';
import SortBySelectorView from '../../../../common/components/sortbyselector/view/SortBySelectorView';
import { ActionDispatchers, controller, State } from '../dashboardsPageRightPaneController';

type Props = ActionDispatchers & State;

const DashboardsPageRightPaneView = ({
  hideDashboardsPageRightPane,
  isFullScreenModeActive,
  dashboardsPageRightPaneGutterOffset,
  shouldShowDashboardsPageRightPane,
  shouldShowDashboardsPageRightPanePermanently
}: Props) => (
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

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(DashboardsPageRightPaneView);
