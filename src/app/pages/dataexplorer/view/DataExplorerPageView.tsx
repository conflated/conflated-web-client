import React from 'react';
import { connect } from 'react-redux';
import styles from './DataExplorerPageView.module.scss';
import PageView from '../../../common/components/page/view/PageView';
import DataExplorerPageLeftPaneView from '../leftpane/view/DataExplorerPageLeftPaneView';
import DataExplorerPageRightPaneView from '../rightpane/view/DataExplorerPageRightPaneView';
import ChartAreaView from '../../../common/components/chartarea/view/ChartAreaView';
import { controller, State } from '../controller/dataExplorerPageController';

type Props = State;

const DataExplorerPageView = ({ isFullScreenModeActive }: Props) => (
  <PageView
    className={isFullScreenModeActive ? styles.fullScreenMode : ''}
    leftPane={<DataExplorerPageLeftPaneView />}
    middlePane={<ChartAreaView pageStateNamespace="dataExplorerPage" />}
    rightPane={<DataExplorerPageRightPaneView />}
    pageStateNamespace="dataExplorerPage"
    showPaneActivatorHintsOnComponentMount={false}
  />
);

export default connect(controller.getState)(DataExplorerPageView);
