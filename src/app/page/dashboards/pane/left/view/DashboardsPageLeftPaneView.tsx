import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PagePaneView from '../../../../../common/views/pagepane/PagePaneView';
import DashboardsPageLeftPaneViewUtils from './DashboardsPageLeftPaneViewUtils';
import DashboardGroupSelectorView from '../selector/dashboardgroup/view/DashboardGroupSelectorView';
import DashboardSelectorView from '../selector/dashboard/view/DashboardSelectorView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageLeftPaneController';

type Props = ActionDispatchers & State;

const DashboardsPageLeftPaneView = ({
  dragStartPosition,
  hideDashboardsPageLeftPane,
  isDashboardGroupSelectorOpen,
  isDashboardSelectorOpen,
  isFullScreenModeActive,
  dashboardsPageLeftPaneGutterOffset,
  shouldShowDashboardsPageLeftPane,
  shouldShowDashboardsPageLeftPanePermanently
}: Props) => {
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
      minWidth="23rem"
      pane="leftPane"
      paneDefaultWidthCssVarName="dashboards-page-left-pane-default-width"
      paneGutterOffset={dashboardsPageLeftPaneGutterOffset}
      dragStartPosition={dragStartPosition}
      shouldShowPagePane={shouldShowDashboardsPageLeftPane}
      shouldShowPagePanePermanently={shouldShowDashboardsPageLeftPanePermanently}
    >
      <DashboardGroupSelectorView />
      <DashboardSelectorView />
    </PagePaneView>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageLeftPaneView);
