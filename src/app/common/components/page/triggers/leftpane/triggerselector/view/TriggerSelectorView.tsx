import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TriggerSelectorListItemView from './listitem/TriggerSelectorListItemView';
import SelectorWithActionsView from '../../../../../selector/withactions/view/SelectorWithActionsView';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../../view/tab/allandfavorites/AllAndFavoritesTabView';
import type { Trigger } from '../model/state/types/Trigger';
import { ActionDispatchers, controller, State } from '../controller/triggerSelectorController';
import { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';

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
  const handleMaximizeIconClick = useCallback(
    () => (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

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
    },
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
      handleMaximizeIconClick={handleMaximizeIconClick}
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
