import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TriggerLabelSelectorListItemView from './listitem/TriggerLabelSelectorListItemView';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithActionsView from '../../../../../selector/withactions/view/SelectorWithActionsView';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import AllAndFavoritesTabView from '../../../../../../view/tab/allandfavorites/AllAndFavoritesTabView';
import type { TriggerLabel } from '../model/state/types/TriggerLabel';
import { ActionDispatchers, controller, State } from '../controller/triggerLabelSelectorController';

export type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerLabelSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerSelectorOpen,
  pageStateNamespace,
  selectedTriggerGroups,
  toggleSelection,
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
      triggerGroups.map((triggerGroup: TriggerLabel) => (
        <TriggerLabelSelectorListItemView
          key={triggerGroup.name}
          triggerGroup={triggerGroup.name}
          selectedTriggerGroups={selectedTriggerGroups}
          selectTriggerGroup={(triggerGroupName: string) => toggleSelection(triggerGroupName)}
          worstTriggerCount={triggerGroup.worstTriggerCount}
          intermediateTriggerCount={triggerGroup.intermediateTriggerCount}
          bestTriggerCount={triggerGroup.bestTriggerCount}
          pageStateNamespace={pageStateNamespace}
        />
      )),
    [triggerGroups, selectedTriggerGroups, pageStateNamespace, toggleSelection]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerGroupSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText={pageStateNamespace === 'goalsPage' ? 'GOAL LABELS' : 'ALERT LABELS'}
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={triggerGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={handleMaximizeIconClick}
      handleSelectAllIconClick={() => {}}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  controller.getState,
  _.memoize(
    (__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace),
    (...args) => args[1].pageStateNamespace
  )
)(TriggerLabelSelectorView);
