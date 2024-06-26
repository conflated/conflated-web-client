import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TriggerSelectorListItemView from './listitem/TriggerSelectorListItemView';
import SelectorWithActionsView from '../../../../../../selector/withtitleactions/view/SelectorWithTitleActionsView';
import selectorWithActionsStateNamespaces from '../../../../../../selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import selectorStateNamespaces from '../../../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../../../views/tab/selector/allandfavorites/AllAndFavoritesTabView';
import type { Trigger } from '../model/state/types/Trigger';
import { ActionDispatchers, controller, State } from '../controller/triggerSelectorController';
import { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import stopEventPropagation from '../../../../../../../utils/stopEventPropagation';

export type OwnProps = { stateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerGroupSelectorOpen,
  stateNamespace,
  selectedTriggers,
  toggleSelection,
  triggers,
  toggleMaximizeSelector
}: Props) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMaximizeIconClick = useCallback(
    _.throttle(() => {
      toggleMaximizeSelector([
        {
          isOpen: isTriggerDataSourceSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]
        },
        {
          isOpen: isTriggerGroupSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${stateNamespace}TriggerGroupSelector`]
        }
      ]);
    }, 150),
    [isTriggerDataSourceSelectorOpen, isTriggerGroupSelectorOpen, stateNamespace, toggleMaximizeSelector]
  );

  const triggerListItems = useMemo(
    () =>
      triggers.map((trigger: Trigger) => (
        <TriggerSelectorListItemView
          key={trigger.name}
          trigger={trigger.name}
          triggerCount={trigger.count}
          severity={trigger.severity}
          selectedTriggers={selectedTriggers}
          selectTrigger={() => toggleSelection(trigger.name)}
        />
      )),
    [triggers, selectedTriggers, toggleSelection]
  );

  const selectorStateNamespace = `${stateNamespace}TriggerSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText={stateNamespace === 'alertsPage' ? 'ALERTS' : 'GOALS'}
      addIconTooltipText={stateNamespace === 'alertsPage' ? 'Add new alert' : 'Add new goal'}
      position="leftPane"
      listItemsContent={<AllAndFavoritesTabView firstTabPaneListItems={triggerListItems} secondTabPaneListItems={[]} />}
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
)(TriggerSelectorView);
