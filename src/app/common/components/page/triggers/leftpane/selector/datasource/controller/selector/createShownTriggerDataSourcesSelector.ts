import { createSelector } from 'reselect';
import FilterUtils from '../../../../../../../../utils/FilterUtils';
import type { AppState } from '../../../../../../../../../../store/AppState';
import type { DataSource } from '../../../../../../../chartarea/chart/model/state/datasource/DataSource';
import selectorWithActionsStateNamespaces from '../../../../../../../selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import type { TriggersPageStateNamespace } from '../../../../../model/state/TriggersPageStateNamespace';

export default function (stateNamespace: TriggersPageStateNamespace) {
  const triggerDataSourcesSelector = (appState: AppState) =>
    appState[stateNamespace].triggerDataSourceSelectorState.dataSources;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]
    ].searchedValue;

  return createSelector(
    [triggerDataSourcesSelector, searchedValueSelector],
    (triggerDataSources: DataSource[], searchedValue: string) =>
      FilterUtils.filterNamedObjectsByName(triggerDataSources, searchedValue)
  );
}
