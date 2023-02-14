/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import DataSourceListItem from '../../../../../../pages/dataexplorer/leftpane/datasourceselector/view/datasourcelistitem/DataSourceListItem';
import type { AppState } from '../../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import type { DataSource } from '../../../../../model/state/datasource/DataSource';
import selectorStateNamespaces from '../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import { ActionDispatchers, controller, State } from '../triggerDataSourceSelectorController';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerDataSourceSelectorView = ({
  isTriggerGroupSelectorOpen,
  isTriggerSelectorOpen,
  pageStateNamespace,
  selectedDataSources,
  selectTriggerDataSource,
  shouldShowTriggersPageLeftPanePermanently,
  shownDataSources,
  startFetchTriggerDataSources,
  toggleMaximizeSelector,
  toggleShouldShowTriggersPageLeftPanePermanently
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
          stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
        },
        {
          isOpen: isTriggerSelectorOpen,
          stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]
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
          selectedItem={selectedDataSources[0]}
          onItemClick={((selectedDataSource: DataSource) => selectTriggerDataSource(selectedDataSource)) as any}
        />
      )),
    [shownDataSources, selectedDataSources, selectTriggerDataSource]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerDataSourceSelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="DATA SOURCE"
      addIconTooltipText="Add new data source"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={dataSourceListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      isPinned={shouldShowTriggersPageLeftPanePermanently}
      handlePinIconClick={handlePinIconClick}
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(TriggerDataSourceSelectorView);
