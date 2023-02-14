import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import TriggerListItemView from './triggerlistitem/TriggerListItemView';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import SelectorWithDefaultActionsView from '../../../../selectorwithdefaultactions/view/SelectorWithDefaultActionsView';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import selectorStateNamespaces from '../../../../selector/model/state/types/SelectorStateNamespace';
import AllAndFavoritesTabView from '../../../../../view/allandfavoritestabview/AllAndFavoritesTabView';
import type { Trigger } from '../model/state/trigger/Trigger';
import { ActionDispatchers, controller, State } from '../triggerSelectorController';
import { AppState } from '../../../../../../../store/AppState';

type OwnProps = { pageStateNamespace: TriggersPageStateNamespace };
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
          stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
        },
        {
          isOpen: isTriggerGroupSelectorOpen,
          stateNamespace: selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
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
    <SelectorWithDefaultActionsView
      id={selectorStateNamespace}
      titleText="ALERT"
      addIconTooltipText={pageStateNamespace === 'alertsPage' ? 'Add new alert' : 'Add new goal'}
      listItemsContent={<AllAndFavoritesTabView firstTabPaneListItems={triggerListItems} secondTabPaneListItems={[]} />}
      handleMaximizeIconClick={handleMaximizeIconClick}
      selectorStateNamespace={selectorWithDefaultActionsStateNamespaces[selectorStateNamespace]}
    />
  );
};

export default connect(
  (appState: AppState, { pageStateNamespace }: OwnProps) => controller.getState(appState, pageStateNamespace),
  (_, { pageStateNamespace }: OwnProps) => controller.getActionDispatchers(pageStateNamespace)
)(TriggerSelectorView);
