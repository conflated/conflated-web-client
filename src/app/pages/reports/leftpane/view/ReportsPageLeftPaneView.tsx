import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import ReportsPageLeftPaneViewUtils from './ReportsPageLeftPaneViewUtils';
import { ActionDispatchers, controller, State } from '../controller/reportsPageLeftPaneController';
import ReportTemplateGroupSelectorView from '../reporttemplategroupselector/view/ReportTemplateGroupSelectorView';
import ReportTemplateSelectorView from '../reporttemplateselector/view/ReportTemplateSelectorView';

type Props = ActionDispatchers & State;

const ReportsPageLeftPaneView = ({
  hideLeftPane,
  isReportTemplateGroupSelectorOpen,
  isReportTemplateSelectorOpen,
  isFullScreenModeActive,
  leftPaneGutterOffset,
  shouldShowLeftPane,
  shouldShowLeftPanePermanently
}: Props) => {
  useEffect(() => {
    function updateSelectorContentHeights() {
      _.before(2, () =>
        ReportsPageLeftPaneViewUtils.updateSelectorContentHeights(
          isReportTemplateGroupSelectorOpen,
          isReportTemplateSelectorOpen
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
      id="reportsPageLeftPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideLeftPane}
      pane="leftPane"
      paneDefaultWidthCssVarName="dashboards-page-left-pane-default-width"
      paneGutterOffset={leftPaneGutterOffset}
      shouldShowPagePane={shouldShowLeftPane}
      shouldShowPagePanePermanently={shouldShowLeftPanePermanently}
    >
      <ReportTemplateGroupSelectorView />
      <ReportTemplateSelectorView />
    </PagePaneView>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(ReportsPageLeftPaneView);
