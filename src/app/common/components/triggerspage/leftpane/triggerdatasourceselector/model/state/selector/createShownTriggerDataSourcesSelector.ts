import { createSelector } from 'reselect';
import FilterUtils from '../../../../../../../model/state/utils/FilterUtils';
import type { AppState } from '../../../../../../../../../store/AppState';
import type { DataSource } from '../../../../../../../model/state/datasource/DataSource';
import selectorWithDefaultActionsStateNamespaces from '../../../../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import type { TriggersPageStateNamespace } from '../../../../../model/state/TriggersPageStateNamespace';

export default function (pageStateNamespace: TriggersPageStateNamespace) {
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
