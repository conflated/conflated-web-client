/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DataSourceListItem from '../../../../../../../pages/dataexplorer/leftpane/datasourceselector/view/datasourcelistitem/DataSourceListItem';
import SelectorWithActionsView from '../../../../../selector/withactions/view/SelectorWithActionsView';
import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../../view/tab/allandfavorites/AllAndFavoritesTabView';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/triggerDataSourceSelectorController';
import { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';

export type OwnProps = { stateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerDataSourceSelectorView = ({
  isTriggerGroupSelectorOpen,
  isTriggerSelectorOpen,
  stateNamespace,
  selectedDataSources,
  shouldShowTriggersPageLeftPanePermanently,
  shownDataSources,
  startFetchTriggerDataSources,
  toggleMaximizeSelector,
  toggleShouldShowTriggersPageLeftPanePermanently,
  toggleTriggerDataSourceSelection
}: Props) => {
  useEffect(() => {
    startFetchTriggerDataSources();
  }, [startFetchTriggerDataSources]);

  const handleMaximizeIconClick = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isTriggerGroupSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}TriggerGroupSelector`]
        },
        {
          isOpen: isTriggerSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}TriggerSelector`]
        }
      ]);
    },
    [toggleMaximizeSelector, isTriggerGroupSelectorOpen, stateNamespace, isTriggerSelectorOpen]
  );

  const handlePinIconClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();
    toggleShouldShowTriggersPageLeftPanePermanently();
  };

  const dataSourceListItems = useMemo(
    () =>
      shownDataSources.map((dataSource: DataSource) => (
        <DataSourceListItem
          key={dataSource.name}
          item={dataSource}
          selectedItem={selectedDataSources.find((selectedDataSource) => selectedDataSource === dataSource)}
          onItemClick={
            ((selectedDataSource: DataSource) => toggleTriggerDataSourceSelection(selectedDataSource)) as any
          }
          actions={[
            {
              iconName: 'share',
              perform: () => {},
              tooltipText: 'Open in a new browser tab'
            },
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
        />
      )),
    [shownDataSources, selectedDataSources, toggleTriggerDataSourceSelection]
  );

  const selectorStateNamespace = `${stateNamespace}TriggerDataSourceSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText={stateNamespace === 'goalsPage' ? 'GOAL DATA SOURCES' : 'ALERT DATA SOURCES'}
      addIconTooltipText="Add new data source"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dataSourceListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      isPinned={shouldShowTriggersPageLeftPanePermanently}
      handlePinIconClick={handlePinIconClick}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { stateNamespace }: OwnProps) => controller.getActionDispatchers(stateNamespace),
    (...args) => args[1].stateNamespace
  )
)(TriggerDataSourceSelectorView);
