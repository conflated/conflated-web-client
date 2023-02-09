import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import TriggerGroupListItemView from './triggergrouplistitem/TriggerGroupListItemView';
import type { AppState } from '../../../../../../../store/AppState';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import type { TriggerGroup } from '../model/state/triggergroup/TriggerGroup';
import { ActionDispatchers, controller, State } from '../triggerGroupSelectorController';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

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

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(TriggerGroupSelectorView);
