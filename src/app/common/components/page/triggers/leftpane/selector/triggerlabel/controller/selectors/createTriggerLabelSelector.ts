import { createSelector } from 'reselect';
import type { Chart } from '../../../../../../../chartarea/chart/model/state/Chart';
import selectorWithActionsStateNamespaces from '../../../../../../../selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import type { AppState } from '../../../../../../../../../../store/AppState';
import TriggerLabelsFactory from '../../model/state/TriggerLabelsFactory';
import { TriggersPageStateNamespace } from '../../../../../model/state/TriggersPageStateNamespace';

export default function createTriggerLabelSelector(stateNamespace: TriggersPageStateNamespace) {
  const triggersDataTableChartSelector = (appState: AppState): Chart =>
    appState[stateNamespace].chartAreaState.charts[0];

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerGroupSelector`]
    ].searchedValue;

  return createSelector(
    [triggersDataTableChartSelector, searchedValueSelector],
    (triggersDataTableChart: Chart, searchedValue: string) =>
      TriggerLabelsFactory.createTriggerLabels(triggersDataTableChart, searchedValue, stateNamespace)
  );
}
