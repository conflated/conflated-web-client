import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'oo-redux-utils';
import OOReduxUtils from 'oo-redux-utils';
import TriggerGroupListItemView from './triggergrouplistitem/TriggerGroupListItemView';
import type { AppState } from '../../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import TriggerGroupSelectorControllerFactory from '../controller/TriggerGroupSelectorControllerFactory';
import selectorStateNamespaces from '../../../../selector/model/state/namespace/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import createTriggerGroupsSelector from '../model/state/selector/createTriggerGroupsSelector';
import type { TriggerGroup } from '../model/state/triggergroup/TriggerGroup';
import SelectorWithDefaultActionsController from '../../../../selectorwithdefaultactions/selectorWithDefaultActionsController';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };

const mapAppStateToComponentProps = (appState: AppState, { pageStateNamespace }: OwnProps) =>
  OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerGroupSelectorState, {
    triggerGroups: createTriggerGroupsSelector(pageStateNamespace)(appState),

    isTriggerDataSourceSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
        .isSelectorOpen,

    isTriggerSelectorOpen:
      appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
  });

const createController = (dispatch: Dispatch, { pageStateNamespace }: OwnProps) => ({
  toggleMaximizeSelector: new SelectorWithDefaultActionsController(
    dispatch,
    selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
  ).createController().toggleMaximizeSelector,

  ...new TriggerGroupSelectorControllerFactory(dispatch, pageStateNamespace).createController()
});

type MappedState = ReturnType<typeof mapAppStateToComponentProps>;
type Controller = ReturnType<typeof createController>;
type Props = OwnProps & MappedState & Controller;

const TriggerGroupSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerSelectorOpen,
  pageStateNamespace,
  selectedTriggerGroups,
  selectTriggerGroup,
  toggleMaximizeSelector,
  triggerGroups
}: Props) => {
  const handleMaximizeIconClick = (event: React.SyntheticEvent<HTMLElement>) => {
    event.stopPropagation();

    toggleMaximizeSelector([
      {
        isOpen: isTriggerDataSourceSelectorOpen,
        stateNamespace: selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
      },
      {
        isOpen: isTriggerSelectorOpen,
        stateNamespace: selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerSelector`]
      }
    ]);
  };

  const triggerGroupListItems = useMemo(
    () =>
      triggerGroups.map((triggerGroup: TriggerGroup) => (
        <TriggerGroupListItemView
          key={triggerGroup.name}
          triggerGroup={triggerGroup.name}
          selectedTriggerGroups={selectedTriggerGroups}
          selectTriggerGroup={(triggerGroupName: string) => selectTriggerGroup(triggerGroupName)}
          worstTriggerCount={triggerGroup.worstTriggerCount}
          intermediateTriggerCount={triggerGroup.intermediateTriggerCount}
          bestTriggerCount={triggerGroup.bestTriggerCount}
          pageStateNamespace={pageStateNamespace}
        />
      )),
    [triggerGroups, selectedTriggerGroups, pageStateNamespace, selectTriggerGroup]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerGroupSelector`;

  return (
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="ALERT GROUP"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={triggerGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(mapAppStateToComponentProps, createController)(TriggerGroupSelectorView);
