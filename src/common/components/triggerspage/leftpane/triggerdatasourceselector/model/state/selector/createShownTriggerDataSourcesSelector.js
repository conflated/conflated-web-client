// @flow

import { createSelector } from 'reselect';
import type { OutputSelector } from 'reselect';
import FilterUtils from '../../../../../../../model/state/utils/FilterUtils';
import type { AppState } from '../../../../../../../../store/AppState';
import type { DataSource } from '../../../../../../../model/state/datasource/DataSource';
import selectorWithDefaultActionsStateNamespaces from '../../../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';

export default function(
  pageStateNamespace: TriggersPageStateNamespace
): OutputSelector<AppState, void, DataSource[]> {
  const triggerDataSourcesSelector = (appState: AppState) =>
    appState[pageStateNamespace].triggerDataSourceSelectorState.dataSources;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
    ].searchedValue;

  return createSelector(
    [triggerDataSourcesSelector, searchedValueSelector],
    (triggerDataSources: DataSource[], searchedValue: string) =>
      FilterUtils.filterNamedObjectsByName(triggerDataSources, searchedValue)
  );
}
