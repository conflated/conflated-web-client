import { createSelector } from 'reselect';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import selectorWithActionsStateNamespaces from '../../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import type { AppState } from '../../../../../../../../../store/AppState';
import TriggerFactory from '../../model/state/factories/TriggerFactory';

export default function createTriggerSelector(stateNamespace: TriggersPageStateNamespace) {
  const triggersDataTableChartSelector = (appState: AppState): Chart =>
    appState[stateNamespace].chartAreaState.charts[0];

  const selectedTriggerGroupsSelector = (appState: AppState) =>
    appState[stateNamespace].triggerGroupSelectorState.selectedTriggerGroups;

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerSelector`]
    ].searchedValue;

  return createSelector(
    [triggersDataTableChartSelector, selectedTriggerGroupsSelector, searchedValueSelector],
    (triggersDataTableChart: Chart, selectedTriggerGroups: string[], searchedValue: string) =>
      TriggerFactory.createTriggers(triggersDataTableChart, selectedTriggerGroups, searchedValue, stateNamespace)
  );
}
