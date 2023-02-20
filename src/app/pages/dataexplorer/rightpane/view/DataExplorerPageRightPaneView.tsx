import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FilterSelectorView from '../../../../common/components/filterselector/view/FilterSelectorView';
import SortBySelectorView from '../../../../common/components/sortbyselector/view/SortBySelectorView';
import DataPointsCountSelectorView from '../../../../common/components/datapointscountselector/view/DataPointsCountSelectorView';
import type { AppState } from '../../../../../store/AppState';
import DataExplorerPageRightPaneViewUtils from './DataExplorerPageRightPaneViewUtils';
import PagePaneView from '../../../../common/view/pagepane/PagePaneView';
import DataExplorerPageActionIconsView from '../actionicons/view/DataExplorerPageActionIconsView';
import { ActionDispatchers, controller, State } from '../dataExplorerPageRightPaneController';

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
      <FilterSelectorView pageStateNamespace="dataExplorerPage" />
      <SortBySelectorView pageStateNamespace="dataExplorerPage" />
      <DataPointsCountSelectorView selectorStateNamespace="dataExplorerPage" />
    </PagePaneView>
  );
};

export default connect(
  (appState: AppState) => controller.getState(appState),
  () => controller.getActionDispatchers()
)(DataExplorerPageRightPaneView);
