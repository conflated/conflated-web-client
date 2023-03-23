import React from 'react';
import { connect } from 'react-redux';
import styles from './DataExplorerPageView.module.scss';
import PageView from '../../../common/components/page/view/PageView';
import DataExplorerPageLeftPaneView from '../leftpane/view/DataExplorerPageLeftPaneView';
import DataExplorerPageRightPaneView from '../rightpane/view/DataExplorerPageRightPaneView';
import { controller, State } from '../controller/dataExplorerPageController';
import SaveAsDashboardOrReportTemplateDialogView from '../saveasdashboardorreporttemplatedialog/view/SaveAsDashboardOrReportTemplateDialogView';
import DataExplorerChartAreaTabsView from '../chartareatabs/view/DataExplorerChartAreaTabsView';

type Props = State;

const DataExplorerPageView = ({ isFullScreenModeActive }: Props) => (
  <>
    <PageView
      className={isFullScreenModeActive ? styles.fullScreenMode : ''}
      leftPane={<DataExplorerPageLeftPaneView />}
      middlePane={<DataExplorerChartAreaTabsView />}
      rightPane={<DataExplorerPageRightPaneView />}
      stateNamespace="dataExplorerPage"
      showPaneActivatorHintsOnComponentMount={false}
    />
    <SaveAsDashboardOrReportTemplateDialogView />
  </>
);

export default connect(controller.getState)(DataExplorerPageView);
