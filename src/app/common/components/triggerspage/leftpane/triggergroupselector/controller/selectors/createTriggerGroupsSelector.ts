import { createSelector } from 'reselect';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import type { Chart } from '../../../../../chartarea/chart/model/state/Chart';
import selectorWithActionsStateNamespaces from '../../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import type { AppState } from '../../../../../../../../store/AppState';
import TriggerGroupsFactory from '../../model/state/triggergroup/TriggerGroupsFactory';

export default function createTriggerGroupsSelector(pageStateNamespace: TriggersPageStateNamespace) {
  const triggersDataTableChartSelector = (appState: AppState): Chart =>
    appState[pageStateNamespace].chartAreaState.charts[0];

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
    ].searchedValue;

  return createSelector(
    [triggersDataTableChartSelector, searchedValueSelector],
    (triggersDataTableChart: Chart, searchedValue: string) =>
      TriggerGroupsFactory.createTriggerGroups(triggersDataTableChart, searchedValue, pageStateNamespace)
  );
}
