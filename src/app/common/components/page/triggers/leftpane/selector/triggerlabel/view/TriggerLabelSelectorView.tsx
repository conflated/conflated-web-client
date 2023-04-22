import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TriggerLabelSelectorListItemView from './listitem/TriggerLabelSelectorListItemView';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import SelectorWithActionsView from '../../../../../../selector/withtitleactions/view/SelectorWithTitleActionsView';
import selectorWithActionsStateNamespaces from '../../../../../../selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import AllAndFavoritesTabView from '../../../../../../../views/tab/selector/allandfavorites/AllAndFavoritesTabView';
import type { TriggerLabel } from '../model/state/types/TriggerLabel';
import { ActionDispatchers, controller, State } from '../controller/triggerLabelSelectorController';
import stopEventPropagation from '../../../../../../../utils/stopEventPropagation';

export type OwnProps = { stateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerLabelSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerSelectorOpen,
  stateNamespace,
  selectedTriggerGroups,
  toggleSelection,
  toggleMaximizeSelector,
  triggerGroups
}: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMaximizeIconClick = useCallback(
    _.throttle(() => {
      toggleMaximizeSelector([
        {
          isOpen: isTriggerDataSourceSelectorOpen,
          selectorStateNamespace: selectorWithActionsStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]
        },
        {
          isOpen: isTriggerSelectorOpen,
          selectorStateNamespace: selectorWithActionsStateNamespaces[`${stateNamespace}TriggerSelector`]
        }
      ]);
    }, 150),
    [toggleMaximizeSelector, isTriggerSelectorOpen, isTriggerDataSourceSelectorOpen, stateNamespace]
  );

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
          stateNamespace={stateNamespace}
        />
      )),
    [triggerGroups, selectedTriggerGroups, stateNamespace, toggleSelection]
  );

  const selectorStateNamespace = `${stateNamespace}TriggerGroupSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText={stateNamespace === 'goalsPage' ? 'GOAL LABELS' : 'ALERT LABELS'}
      position="leftPane"
      listItemsContent={
        <AllAndFavoritesTabView firstTabPaneListItems={triggerGroupListItems} secondTabPaneListItems={[]} />
      }
      handleMaximizeIconClick={_.flow(stopEventPropagation, handleMaximizeIconClick)}
      handleSelectAllIconClick={() => {}}
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
)(TriggerLabelSelectorView);
