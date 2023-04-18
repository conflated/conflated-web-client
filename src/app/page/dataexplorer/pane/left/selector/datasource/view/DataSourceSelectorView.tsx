/* eslint-disable react/jsx-closing-tag-location */
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Accordion, Confirm } from 'semantic-ui-react';
import _ from 'lodash';
import DataSourceListItem from './datasourcelistitem/DataSourceListItem';
import SelectorWithActionsView from '../../../../../../../common/components/selector/withtitleactions/view/SelectorWithTitleActionsView';
import type { DataSource } from '../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import emptyDataSource from '../../../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { ActionDispatchers, controller, State } from '../controller/dataSourceSelectorController';
import AllAndFavoritesTabView from '../../../../../../../common/views/tab/selector/allandfavorites/AllAndFavoritesTabView';
import ListView from '../../../../../../../common/views/list/ListView';
import styles from './DataSourceSelectorView.module.scss';
import stopEventPropagation from '../../../../../../../common/utils/stopEventPropagation';

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
  toggleMaximizeSelector,
  toggleSelectorOpen
}: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMaximizeIconClick = useCallback(
    _.debounce(
      () =>
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
        ]),
      150
    ),
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
        confirmDataSourceSelection(dataSource, selectedChart);
        toggleSelectorOpen();
      } else {
        selectDataSourceToBeConfirmed(dataSource);
      }
    }

    function createAccordionFor(dataSourceLabels: string[]) {
      const panels = dataSourceLabels
        .filter(() => shownDataSources.length > 0)
        .map((dataSourceLabel) => ({
          title: dataSourceLabel,
          key: dataSourceLabel,
          content: {
            content: (
              <ListView
                className={styles.listItems}
                listItems={shownDataSources
                  .filter(
                    (shownDataSource) => dataSourceLabel === 'All' || shownDataSource.labels.includes(dataSourceLabel)
                  )
                  .map((dataSource) => (
                    <DataSourceListItem
                      actions={[
                        {
                          iconName: 'star',
                          perform: () => {},
                          tooltipText: 'Add to favorites'
                        },
                        { iconName: 'edit', perform: () => {}, tooltipText: 'Edit' },
                        {
                          iconName: 'trash alternate outline',
                          perform: () => {},
                          tooltipText: 'Delete'
                        }
                      ]}
                      key={dataSource.name}
                      item={dataSource}
                      iconName={dataSource.type === 'raw' ? 'table' : 'cube'}
                      selectedItem={selectedChart.dataSource}
                      onItemClick={() => handleDataSourceClick(dataSource)}
                      onItemDblClick={handleMaximizeIconClick}
                    />
                  ))}
                noContentFirstLineText=""
                noContentSecondLineText=""
              />
            )
          }
        }));

      return (
        <Accordion
          className={styles.accordion}
          exclusive
          inverted
          onDoubleClick={handleMaximizeIconClick}
          panels={panels}
        />
      );
    }

    const sortedUniqueDataSourceLabels = _.sortedUniq(
      shownDataSources.flatMap((shownDataSource) => shownDataSource.labels).sort()
    );

    return createAccordionFor(['All', ...sortedUniqueDataSourceLabels]);
  }, [
    shownDataSources,
    selectedChart,
    confirmDataSourceSelection,
    toggleSelectorOpen,
    selectDataSourceToBeConfirmed,
    handleMaximizeIconClick
  ]);

  return (
    <SelectorWithActionsView
      id="dataSourceSelector"
      titleText="DATA SOURCES"
      addIconTooltipText="Add new data source"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView
          firstTabPaneListItems={dataSourceListItems}
          isListItemReorderModeActive={false}
          secondTabPaneListItems={[]}
        />
      }
      handleMaximizeIconClick={_.flow(stopEventPropagation, handleMaximizeIconClick)}
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
          onConfirm={() => confirmDataSourceSelection(selectedChart.dataSource, selectedChart)}
        />
      }
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DataSourceSelectorView);
