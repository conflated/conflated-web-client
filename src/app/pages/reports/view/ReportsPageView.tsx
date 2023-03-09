import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageView from '../../../common/components/page/view/PageView';
import ChartAreaView from '../../../common/components/chartarea/view/ChartAreaView';

// type Props = ActionDispatchers & State;

const ReportsPageView = () => {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchReportTemplateGroups();
  }, [startFetchReportTemplateGroups]);

  return (
    <PageView
      leftPane={<ReportsPageLeftPaneView />}
      middlePane={<ChartAreaView pageStateNamespace="reportsPage" />}
      pageStateNamespace="reportsPage"
      showPaneActivatorHintsOnComponentMount
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportsPageView);
