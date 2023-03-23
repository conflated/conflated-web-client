import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PageView from '../../../common/components/page/view/PageView';
import { ActionDispatchers, controller, State } from '../controller/reportsPageController';
import ReportsChartAreaTabsView from './chartareatabs/ReportsChartAreaTabsView';
import ReportsPageLeftPaneView from '../leftpane/view/ReportsPageLeftPaneView';
import GenerateReportDialogView from '../generatereportdialog/view/GenerateReportDialogView';

type Props = ActionDispatchers & State;

const ReportsPageView = ({ startFetchReportTemplateGroups }: Props) => {
  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchReportTemplateGroups();
  }, [startFetchReportTemplateGroups]);

  return (
    <>
      <PageView
        leftPane={<ReportsPageLeftPaneView />}
        middlePane={<ReportsChartAreaTabsView />}
        stateNamespace="reportsPage"
        showPaneActivatorHintsOnComponentMount
      />
      <GenerateReportDialogView />
    </>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportsPageView);
