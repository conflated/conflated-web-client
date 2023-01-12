// @flow

import type { OutputSelector } from 'reselect';
import { createSelector } from 'reselect';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';
import type { Chart } from '../../../../../../chartarea/chart/model/state/Chart';
import selectorWithDefaultActionsStateNamespaces from '../../../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import type { TriggerGroup } from '../triggergroup/TriggerGroup';
import type { AppState } from '../../../../../../../../store/AppState';
import TriggerGroupsFactory from '../triggergroup/TriggerGroupsFactory';

export default function createTriggerGroupsSelector(
  pageStateNamespace: TriggersPageStateNamespace
): OutputSelector<AppState, void, TriggerGroup[]> {
  const triggersDataTableChartSelector = (appState: AppState): Chart =>
    appState[pageStateNamespace].chartAreaState.charts[0];

  const searchedValueSelector = (appState: AppState): string =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]
    ].searchedValue;

  return createSelector(
    [triggersDataTableChartSelector, searchedValueSelector],
    (triggersDataTableChart: Chart, searchedValue: string) =>
      TriggerGroupsFactory.createTriggerGroups(triggersDataTableChart, searchedValue, pageStateNamespace)
  );
}
