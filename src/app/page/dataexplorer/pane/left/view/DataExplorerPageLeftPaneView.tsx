import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ChartTypeSelector from '../selector/charttype/view/ChartTypeSelectorView';
import DataSourceSelector from '../selector/datasource/view/DataSourceSelectorView';
import DimensionSelector from '../selector/dimension/view/DimensionSelectorView';
import LayoutSelector from '../selector/layout/view/LayoutSelectorView';
import MeasureSelector from '../selector/measure/view/MeasureSelectorView';
import DataExplorerPageLeftPaneViewUtils from './DataExplorerPageLeftPaneViewUtils';
import PagePaneView from '../../../../../common/views/pagepane/PagePaneView';
import { ActionDispatchers, controller, State } from '../controller/dataExplorerPageLeftPaneController';

type Props = ActionDispatchers & State;

const DataExplorerPageLeftPaneView = ({
  dataExplorerPageLeftPaneGutterOffset,
  dragStartPosition,
  hideDataExplorerPageLeftPane,
  isDataSourceSelectorOpen,
  isDimensionSelectorOpen,
  isFullScreenModeActive,
  isMeasureSelectorOpen,
  shouldShowDataExplorerPageLeftPane,
  shouldShowDataExplorerPageLeftPanePermanently
}: Props) => {
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
      dragStartPosition={dragStartPosition}
      id="dataExplorerPageLeftPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideDataExplorerPageLeftPane}
      minWidth="16rem"
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
};

export default connect(controller.getState, () => controller.actionDispatchers)(DataExplorerPageLeftPaneView);
