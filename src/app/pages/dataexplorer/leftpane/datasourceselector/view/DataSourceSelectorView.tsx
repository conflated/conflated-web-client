import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Confirm } from 'semantic-ui-react';
import DataSourceListItem from './datasourcelistitem/DataSourceListItem';
import SelectorWithActionsView from '../../../../../common/components/selector/withactions/view/SelectorWithActionsView';
import type { DataSource } from '../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import emptyDataSource from '../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { ActionDispatchers, controller, State } from '../controller/dataSourceSelectorController';

type Props = ActionDispatchers & State;

const DataSourceSelectorView = ({
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
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isLayoutSelectorOpen,
          selectorStateNamespace: 'layoutSelector'
        },
        {
          isOpen: isChartTypeSelectorOpen,
          selectorStateNamespace: 'chartTypeSelector'
        },
        {
          isOpen: isMeasureSelectorOpen,
          selectorStateNamespace: 'measureSelector'
        },
        {
          isOpen: isDimensionSelectorOpen,
          selectorStateNamespace: 'dimensionSelector'
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
        iconName={dataSource.type === 'raw' ? 'table' : 'chart line'}
        selectedItem={selectedChart.dataSource}
        onItemClick={() => handleDataSourceClick(dataSource)}
      />
    ));
  }, [shownDataSources, selectedChart.dataSource, confirmDataSourceSelection, selectDataSourceToBeConfirmed]);

  return (
    <SelectorWithActionsView
      id="dataSourceSelector"
      titleText="DATA SOURCES"
      addIconTooltipText="Add new data source"
      position="leftPane"
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
};

export default connect(controller.getState, () => controller.actionDispatchers)(DataSourceSelectorView);
