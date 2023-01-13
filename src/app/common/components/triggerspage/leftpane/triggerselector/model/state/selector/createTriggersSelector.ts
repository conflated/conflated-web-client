import { createSelector } from 'reselect';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import selectorWithDefaultActionsStateNamespaces from '../../../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import type { AppState } from '../../../../../../../../../store/AppState';
import TriggerFactory from '../trigger/TriggerFactory';

export default function createTriggersSelector(pageStateNamespace: TriggersPageStateNamespace) {
  const triggersDataTableChartSelector = (appState: AppState): Chart =>
    appState[pageStateNamespace].chartAreaState.charts[0];

  const selectedTriggerGroupsSelector = (appState: AppState) =>
    appState[pageStateNamespace].triggerGroupSelectorState.selectedTriggerGroups;

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerSelector`]
    ].searchedValue;

  return createSelector(
    [triggersDataTableChartSelector, selectedTriggerGroupsSelector, searchedValueSelector],
    (triggersDataTableChart: Chart, selectedTriggerGroups: string[], searchedValue: string) =>
      TriggerFactory.createTrigger(triggersDataTableChart, selectedTriggerGroups, searchedValue, pageStateNamespace)
  );
}
