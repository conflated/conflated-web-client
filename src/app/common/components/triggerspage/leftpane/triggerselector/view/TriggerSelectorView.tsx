import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import TriggerListItemView from './listitem/TriggerListItemView';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithActionsView from '../../../../selectorwithactions/view/SelectorWithActionsView';
import selectorWithActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import selectorStateNamespaces from '../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import type { Trigger } from '../model/state/trigger/Trigger';
import { ActionDispatchers, controller, State } from '../controller/triggerSelectorController';

export type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
type Props = OwnProps & ActionDispatchers & State;

const TriggerSelectorView = ({
  isTriggerDataSourceSelectorOpen,
  isTriggerGroupSelectorOpen,
  pageStateNamespace,
  selectedTriggers,
  selectTrigger,
  triggers,
  toggleMaximizeSelector
}: Props) => {
  const handleMaximizeIconClick = useCallback(
    () => (event: React.SyntheticEvent<HTMLElement>) => {
      event.stopPropagation();

      toggleMaximizeSelector([
        {
          isOpen: isTriggerDataSourceSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
        },
        {
          isOpen: isTriggerGroupSelectorOpen,
          selectorStateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
        }
      ]);
    },
    [isTriggerDataSourceSelectorOpen, isTriggerGroupSelectorOpen, pageStateNamespace, toggleMaximizeSelector]
  );

  const triggerListItems = useMemo(
    () =>
      triggers.map((trigger: Trigger) => (
        <TriggerListItemView
          key={trigger.name}
          trigger={trigger.name}
          triggerCount={trigger.count}
          severity={trigger.severity}
          selectedTriggers={selectedTriggers}
          selectTrigger={() => selectTrigger(trigger.name)}
        />
      )),
    [triggers, selectedTriggers, selectTrigger]
  );

  const selectorStateNamespace = `${pageStateNamespace}TriggerSelector`;

  return (
    <SelectorWithActionsView
      id={selectorStateNamespace}
      titleText={pageStateNamespace === 'alertsPage' ? 'ALERTS' : 'GOALS'}
      addIconTooltipText={pageStateNamespace === 'alertsPage' ? 'Add new alert' : 'Add new goal'}
      position="leftPane"
      listItemsContent={<AllAndFavoritesTabView firstTabPaneListItems={triggerListItems} secondTabPaneListItems={[]} />}
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  controller.getState,
  _.memoize((__, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace))
)(TriggerSelectorView);
