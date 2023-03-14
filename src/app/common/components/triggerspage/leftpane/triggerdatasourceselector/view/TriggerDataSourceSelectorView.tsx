/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import DataSourceListItem from '../../../../../../pages/dataexplorer/leftpane/datasourceselector/view/datasourcelistitem/DataSourceListItem';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithActionsView from '../../../../selectorwithactions/view/SelectorWithActionsView';
import type { DataSource } from '../../../../chartarea/chart/model/state/datasource/DataSource';
import selectorStateNamespaces from '../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import selectorWithActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../controller/triggerDataSourceSelectorController';

export type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerDataSourceSelectorView = ({
  isTriggerGroupSelectorOpen,
  isTriggerSelectorOpen,
  pageStateNamespace,
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
          selectorStateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
        },
        {
          isOpen: isTriggerSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]
        }
      ]);
    },
    [toggleMaximizeSelector, isTriggerGroupSelectorOpen, pageStateNamespace, isTriggerSelectorOpen]
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
        />
      )),
    [shownDataSources, selectedDataSources, toggleTriggerDataSourceSelection]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerDataSourceSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText="DATA SOURCES"
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
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(TriggerDataSourceSelectorView);
