import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import ChartTypeSelector from '../charttypeselector/view/ChartTypeSelectorView';
import DataSourceSelector from '../datasourceselector/view/DataSourceSelectorView';
import DimensionSelector from '../dimensionselector/view/DimensionSelectorView';
import LayoutSelector from '../layoutselector/view/LayoutSelectorView';
import MeasureSelector from '../measureselector/view/MeasureSelectorView';
import type { AppState } from '../../../store/AppState';
import DataExplorerPageLeftPaneControllerFactory from '../controller/DataExplorerPageLeftPaneControllerFactory';
import DataExplorerPageLeftPaneViewUtils from './DataExplorerPageLeftPaneViewUtils';
import PagePaneView from '../../../common/view/pagepane/PagePaneView';

const mapAppStateToComponentProps = (appState: AppState) => ({
  isFullScreenModeActive: appState.headerState.isFullScreenModeActive,
  shouldShowDataExplorerPageLeftPane: appState.common.pageStates.dataExplorerPage.shouldShowPagePane.leftPane,

  shouldShowDataExplorerPageLeftPanePermanently:
    appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.leftPane,

  dataExplorerPageLeftPaneGutterOffset: appState.common.pageStates.dataExplorerPage.pagePaneGutterOffset.leftPane,
  isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
  isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
  isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen
});

const createController = (dispatch: Dispatch) =>
  new DataExplorerPageLeftPaneControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DataExplorerPageLeftPaneView({
  dataExplorerPageLeftPaneGutterOffset,
  hideDataExplorerPageLeftPane,
  isDataSourceSelectorOpen,
  isDimensionSelectorOpen,
  isFullScreenModeActive,
  isMeasureSelectorOpen,
  shouldShowDataExplorerPageLeftPane,
  shouldShowDataExplorerPageLeftPanePermanently
}: Props) {
  useEffect(() => {
    function updateSelectorContentHeights() {
      _.before(2, () =>
        DataExplorerPageLeftPaneViewUtils.updateSelectorContentHeights({
          isDimensionSelectorOpen,
          isDataSourceSelectorOpen,
          isMeasureSelectorOpen
        })
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
      id="dataExplorerPageLeftPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideDataExplorerPageLeftPane}
      pane="leftPane"
      paneDefaultWidthCssVarName="data-explorer-page-left-pane-default-width"
      paneGutterOffset={dataExplorerPageLeftPaneGutterOffset}
      shouldShowPagePane={shouldShowDataExplorerPageLeftPane}
      shouldShowPagePanePermanently={shouldShowDataExplorerPageLeftPanePermanently}
    >
      <LayoutSelector />
      <ChartTypeSelector />
      <DataSourceSelector />
      <MeasureSelector />
      <DimensionSelector />
    </PagePaneView>
  );
}

export default connect(mapAppStateToComponentProps, createController)(DataExplorerPageLeftPaneView);
