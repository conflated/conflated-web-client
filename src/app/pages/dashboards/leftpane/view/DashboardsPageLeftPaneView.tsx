import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import DashboardsPageLeftPaneViewUtils from './DashboardsPageLeftPaneViewUtils';
import DashboardGroupSelectorView from '../dashboardgroupselector/view/DashboardGroupSelectorView';
import DashboardSelectorView from '../dashboardselector/view/DashboardSelectorView';
import { ActionDispatchers, controller, State } from '../controller/dashboardsPageLeftPaneController';

type Props = ActionDispatchers & State;

const DashboardsPageLeftPaneView = ({
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
};

export default connect(controller.getState, () => controller.actionDispatchers)(DashboardsPageLeftPaneView);
