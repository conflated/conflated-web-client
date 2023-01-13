import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import DataSourceListItem from '../../../../../../pages/dataexplorer/leftpane/datasourceselector/view/datasourcelistitem/DataSourceListItem';
import type { AppState } from '../../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';
import TriggerDataSourceSelectorControllerFactory from '../controller/TriggerDataSourceSelectorControllerFactory';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import createShownTriggerDataSourcesSelector from '../model/state/selector/createShownTriggerDataSourcesSelector';
import type { DataSource } from '../../../../../model/state/datasource/DataSource';
import selectorStateNamespaces from '../../../../selector/model/state/namespace/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import SelectorWithDefaultActionsControllerFactory from '../../../../selectorwithdefaultactions/controller/SelectorWithDefaultActionsControllerFactory';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) =>
  OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerDataSourceSelectorState, {
    shownDataSources: createShownTriggerDataSourcesSelector(pageStateNamespace)(appState),

    shouldShowTriggersPageLeftPanePermanently:
      appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.leftPane,

    isTriggerGroupSelectorOpen:
      appState.common.selectorStates[
        selectorStateNamespaces[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
      ].isSelectorOpen,

    isTriggerSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
  });

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsControllerFactory(
    dispatch,
    selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
  ).createController().toggleMaximizeSelector,

  ...new TriggerDataSourceSelectorControllerFactory(dispatch, pageStateNamespace).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

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
    [isTriggerSelectorOpen, isTriggerGroupSelectorOpen]
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
          onItemClick={(selectedDataSource: DataSource) => selectTriggerDataSource(selectedDataSource)}
        />
      )),
    [shownDataSources, selectedDataSources, selectTriggerDataSource]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerDataSourceSelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="DATA SOURCE"
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

export default connect(mapAppStateToComponentProps, createController)(TriggerDataSourceSelectorView);
