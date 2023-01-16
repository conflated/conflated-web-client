import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import { Confirm } from 'semantic-ui-react';
import DataSourceListItem from './datasourcelistitem/DataSourceListItem';
import type { AppState } from '../../../../../../store/AppState';
import DataSourceSelectorControllerFactory from '../controller/DataSourceSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../../common/components/selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectShownDataSources from '../model/selectors/selectShownDataSources';
import type { DataSource } from '../../../../../common/model/state/datasource/DataSource';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import emptyDataSource from '../../../../../common/model/state/datasource/emptyDataSource';
import SelectorWithDefaultActionsController from '../../../../../common/components/selectorwithdefaultactions/selectorWithDefaultActionsController';

const mapAppStateToComponentProps = (appState: AppState) =>
  OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dataSourceSelectorState, {
    selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
    shownDataSources: selectShownDataSources(appState),
    isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
    isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
    isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
    isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen
  });

const createController = (dispatch: Dispatch) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsController(dispatch, 'dataSourceSelector').createController()
    .toggleMaximizeSelector,

  ...new DataSourceSelectorControllerFactory(dispatch).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = MappedState & Controller;

function DataSourceSelectorView({
  confirmDataSourceSelection,
  hideDataSourceChangeConfirmation,
  isChartTypeSelectorOpen,
  isDataSourceChangeConfirmationShown,
  isDimensionSelectorOpen,
  isLayoutSelectorOpen,
  isMeasureSelectorOpen,
  selectDataSourceToBeConfirmed,
  selectedChart,
  shownDataSources,
  startFetchDataSources,
  toggleMaximizeSelector
}: Props) {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isLayoutSelectorOpen,
          stateNamespace: 'layoutSelector'
        },
        {
          isOpen: isChartTypeSelectorOpen,
          stateNamespace: 'chartTypeSelector'
        },
        {
          isOpen: isMeasureSelectorOpen,
          stateNamespace: 'measureSelector'
        },
        {
          isOpen: isDimensionSelectorOpen,
          stateNamespace: 'dimensionSelector'
        }
      ]);
    },
    [
      isChartTypeSelectorOpen,
      isDimensionSelectorOpen,
      isLayoutSelectorOpen,
      isMeasureSelectorOpen,
      toggleMaximizeSelector
    ]
  );

  useEffect(() => {
    // noinspection JSIgnoredPromiseFromCall
    startFetchDataSources();
  }, [startFetchDataSources]);

  const dataSourceListItems = useMemo(() => {
    function handleDataSourceClick(dataSource: DataSource) {
      if (selectedChart.dataSource === emptyDataSource) {
        confirmDataSourceSelection(dataSource);
      } else {
        selectDataSourceToBeConfirmed(dataSource);
      }
    }

    return shownDataSources.map((dataSource: DataSource) => (
      <DataSourceListItem
        key={dataSource.name}
        item={dataSource}
        selectedItem={selectedChart.dataSource}
        onItemClick={() => handleDataSourceClick(dataSource)}
      />
    ));
  }, [shownDataSources, selectedChart.dataSource, confirmDataSourceSelection, selectDataSourceToBeConfirmed]);

  return (
    <SelectorWithDefaultActionsView
      id="dataSourceSelector"
      titleText="DATA SOURCE"
      listItemsContent={
        <ListItemsView
          listItems={dataSourceListItems}
          noContentFirstLineText="No data sources"
          noContentSecondLineText=" Add new data source first"
        />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace="dataSourceSelector"
      additionalContent={
        <Confirm
          className="confirm"
          open={isDataSourceChangeConfirmationShown}
          header="DATA SOURCE CHANGE WILL CLEAR THE CHART!"
          content="Change data source?"
          confirmButton="CHANGE"
          cancelButton="CANCEL"
          onCancel={hideDataSourceChangeConfirmation}
          onConfirm={() => confirmDataSourceSelection(selectedChart.dataSource)}
        />
      }
    />
  );
}

export default connect(mapAppStateToComponentProps, createController)(DataSourceSelectorView);
