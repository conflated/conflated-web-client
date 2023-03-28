/* eslint-disable react/jsx-closing-tag-location */
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Accordion, Confirm } from 'semantic-ui-react';
import _ from 'lodash';
import DataSourceListItem from './datasourcelistitem/DataSourceListItem';
import SelectorWithActionsView from '../../../../../common/components/selector/withactions/view/SelectorWithActionsView';
import type { DataSource } from '../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import emptyDataSource from '../../../../../common/components/chartarea/chart/model/state/datasource/emptyDataSource';
import { ActionDispatchers, controller, State } from '../controller/dataSourceSelectorController';
import AllAndFavoritesTabView from '../../../../../common/view/tab/allandfavorites/AllAndFavoritesTabView';
import ListItemsView from '../../../../../common/view/listitems/ListItemsView';
import styles from './DataSourceSelectorView.module.scss';

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
        confirmDataSourceSelection(dataSource, selectedChart);
      } else {
        selectDataSourceToBeConfirmed(dataSource);
      }
    }

    function createAccordionFor(dataSourceLabels: string[]) {
      const panels = dataSourceLabels.map((dataSourceLabel) => ({
        title: dataSourceLabel,
        key: dataSourceLabel,
        content: {
          content: (
            <ListItemsView
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
                    iconName={dataSource.type === 'raw' ? 'table' : 'chart line'}
                    selectedItem={selectedChart.dataSource}
                    onItemClick={() => handleDataSourceClick(dataSource)}
                  />
                ))}
              noContentFirstLineText=""
              noContentSecondLineText=""
            />
          )
        }
      }));

      return <Accordion className={styles.accordion} exclusive inverted panels={panels} />;
    }

    const sortedUniqueDataSourceLabels = _.sortedUniq(
      shownDataSources.flatMap((shownDataSource) => shownDataSource.labels).sort()
    );

    return createAccordionFor(['All', ...sortedUniqueDataSourceLabels]);
  }, [shownDataSources, selectedChart, confirmDataSourceSelection, selectDataSourceToBeConfirmed]);

  return (
    <SelectorWithActionsView
      id="dataSourceSelector"
      titleText="DATA SOURCES"
      addIconTooltipText="Add new data source"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView
          firstTabPaneListItems={[dataSourceListItems, <div />]}
          isListItemReorderModeActive={false}
          secondTabPaneListItems={[]}
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
          onConfirm={() => confirmDataSourceSelection(selectedChart.dataSource, selectedChart)}
        />
      }
    />
  );
};

export default connect(controller.getState, () => controller.actionDispatchers)(DataSourceSelectorView);
