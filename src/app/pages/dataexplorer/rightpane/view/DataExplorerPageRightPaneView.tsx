import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FilterSelectorView from '../../../../common/components/selector/filter/view/FilterSelectorView';
import SortBySelectorView from '../../../../common/components/selector/sortby/view/SortBySelectorView';
import DataPointsCountSelectorView from '../../../../common/components/selector/datapointscount/view/DataPointsCountSelectorView';
import DataExplorerPageRightPaneViewUtils from './DataExplorerPageRightPaneViewUtils';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import DataExplorerPageActionIconsView from '../actionicons/view/DataExplorerActionIconsView';
import { ActionDispatchers, controller, State } from '../controller/dataExplorerPageRightPaneController';

type Props = ActionDispatchers & State;

const DataExplorerPageRightPaneView = ({
  hideDataExplorerPageRightPane,
  isDataPointsCountSelectorOpen,
  isFilterSelectorOpen,
  isFullScreenModeActive,
  isSortBySelectorOpen,
  dataExplorerPageRightPaneGutterOffset,
  shouldShowDataExplorerPageRightPane,
  shouldShowDataExplorerPageRightPanePermanently
}: Props) => {
  useEffect(() => {
    function updateSelectorContentHeights() {
      _.before(2, () =>
        DataExplorerPageRightPaneViewUtils.updateSelectorContentHeights({
          isDataPointsCountSelectorOpen,
          isFilterSelectorOpen,
          isSortBySelectorOpen
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
      id="dataExplorerPageRightPane"
      isFullScreenModeActive={isFullScreenModeActive}
      hidePagePane={hideDataExplorerPageRightPane}
      pane="rightPane"
      paneDefaultWidthCssVarName="data-explorer-page-right-pane-default-width"
      paneGutterOffset={dataExplorerPageRightPaneGutterOffset}
      shouldShowPagePane={shouldShowDataExplorerPageRightPane}
      shouldShowPagePanePermanently={shouldShowDataExplorerPageRightPanePermanently}
    >
      <DataExplorerPageActionIconsView />
      <FilterSelectorView stateNamespace="dataExplorerPage" />
      <SortBySelectorView stateNamespace="dataExplorerPage" />
      <DataPointsCountSelectorView stateNamespace="dataExplorerPage" />
    </PagePaneView>
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DataExplorerPageRightPaneView);
