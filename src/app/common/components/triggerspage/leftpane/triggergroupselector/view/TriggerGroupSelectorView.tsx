import _ from 'lodash';
import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import TriggerGroupListItemView from './triggergrouplistitem/TriggerGroupListItemView';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithActionsView from '../../../../selectorwithactions/view/SelectorWithActionsView';
import selectorWithActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import type { TriggerGroup } from '../model/state/triggergroup/TriggerGroup';
import { ActionDispatchers, controller, State } from '../controller/triggerGroupSelectorController';

export type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
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
        selectorStateNamespace: selectorWithActionsStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
      },
      {
        isOpen: isTriggerSelectorOpen,
        selectorStateNamespace: selectorWithActionsStateNamespaces[`${pageStateNamespace}TriggerSelector`]
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
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText="ALERT GROUP"
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={triggerGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  controller.getState,
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(TriggerGroupSelectorView);
