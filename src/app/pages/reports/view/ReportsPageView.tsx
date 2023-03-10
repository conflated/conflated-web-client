import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageView from '../../../common/components/page/view/PageView';
import { ActionDispatchers, controller, State } from '../controller/reportsPageController';
import ChartAreaTabsView from './chartareatabs/ChartAreaTabsView';
import ReportsPageLeftPaneView from '../leftpane/view/ReportsPageLeftPaneView';

type Props = ActionDispatchers & State;

const ReportsPageView = ({ startFetchReportTemplateGroups }: Props) => {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchReportTemplateGroups();
  }, [startFetchReportTemplateGroups]);

  return (
    <PageView
      leftPane={<ReportsPageLeftPaneView />}
      middlePane={<ChartAreaTabsView />}
      pageStateNamespace="reportsPage"
      showPaneActivatorHintsOnComponentMount
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportsPageView);
