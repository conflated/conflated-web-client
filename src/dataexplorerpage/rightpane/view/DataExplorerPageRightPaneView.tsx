import _ from 'lodash';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import FilterSelectorView from '../../../common/components/filterselector/view/FilterSelectorView';
import SortBySelectorView from '../../../common/components/sortbyselector/view/SortBySelectorView';
import DataPointsCountSelectorView from '../../../common/components/datapointscountselector/view/DataPointsCountSelectorView';
import type { AppState } from '../../../store/AppState';
import DataExplorerPageRightPaneControllerFactory from '../controller/DataExplorerPageRightPaneControllerFactory';
import DataExplorerPageRightPaneViewUtils from './DataExplorerPageRightPaneViewUtils';
import PagePaneView from '../../../common/view/pagepane/PagePaneView';
import DataExplorerPageActionIconsView from '../actionicons/view/DataExplorerPageActionIconsView';

const mapAppStateToComponentProps = (appState: AppState) => ({
  isFullScreenModeActive: appState.headerState.isFullScreenModeActive,

  shouldShowDataExplorerPageRightPane: appState.common.pageStates.dataExplorerPage.shouldShowPagePane.rightPane,

  shouldShowDataExplorerPageRightPanePermanently:
    appState.common.pageStates.dataExplorerPage.shouldShowPagePanePermanently.rightPane,

  dataExplorerPageRightPaneGutterOffset: appState.common.pageStates.dataExplorerPage.pagePaneGutterOffset.rightPane,

  isFilterSelectorOpen: appState.common.selectorStates.dataExplorerPageFilterSelector.isSelectorOpen,
  isSortBySelectorOpen: appState.common.selectorStates.dataExplorerPageSortBySelector.isSelectorOpen,
  isDataPointsCountSelectorOpen: appState.common.selectorStates.dataExplorerPageDataPointsCountSelector.isSelectorOpen
});

const createController = (dispatch: Dispatch) =>
  new DataExplorerPageRightPaneControllerFactory(dispatch).createController();

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DataExplorerPageRightPaneView({
  hideDataExplorerPageRightPane,
  isDataPointsCountSelectorOpen,
  isFilterSelectorOpen,
  isFullScreenModeActive,
  isSortBySelectorOpen,
  dataExplorerPageRightPaneGutterOffset,
  shouldShowDataExplorerPageRightPane,
  shouldShowDataExplorerPageRightPanePermanently
}: Props) {
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
      <DataPointsCountSelectorView pageStateNamespace="dataExplorerPage" />
    </PagePaneView>
  );
}

export default connect(mapAppStateToComponentProps, createController)(DataExplorerPageRightPaneView);
