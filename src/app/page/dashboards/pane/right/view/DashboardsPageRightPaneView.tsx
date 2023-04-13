import React from 'react';
import { connect } from 'react-redux';
import PagePaneView from '../../../../../common/views/pagepane/PagePaneView';
import FilterSelectorView from '../../../../../common/components/selector/filter/view/FilterSelectorView';
import SortBySelectorView from '../../../../../common/components/selector/sort/view/SortSelectorView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageRightPaneController';

type Props = ActionDispatchers & State;

const DashboardsPageRightPaneView = ({
  dragStartPosition,
  hideDashboardsPageRightPane,
  isFullScreenModeActive,
  dashboardsPageRightPaneGutterOffset,
  shouldShowDashboardsPageRightPane,
  shouldShowDashboardsPageRightPanePermanently
}: Props) => (
  <PagePaneView
    dragStartPosition={dragStartPosition}
    id="dashboardsPageRightPane"
    isFullScreenModeActive={isFullScreenModeActive}
    hidePagePane={hideDashboardsPageRightPane}
    minWidth="20rem"
    pane="rightPane"
    paneDefaultWidthCssVarName="dashboards-page-right-pane-default-width"
    paneGutterOffset={dashboardsPageRightPaneGutterOffset}
    shouldShowPagePane={shouldShowDashboardsPageRightPane}
    shouldShowPagePanePermanently={shouldShowDashboardsPageRightPanePermanently}
  >
    <FilterSelectorView stateNamespace="dashboardsPage" />
    <SortBySelectorView stateNamespace="dashboardsPage" />
  </PagePaneView>
);

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageRightPaneView);
