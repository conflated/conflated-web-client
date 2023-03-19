import { createSelector } from 'reselect';
import FilterUtils from '../../../../../../../utils/FilterUtils';
import type { AppState } from '../../../../../../../../../store/AppState';
import type { DataSource } from '../../../../../../chartarea/chart/model/state/datasource/DataSource';
import selectorWithActionsStateNamespaces from '../../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default function (pageStateNamespace: TriggersPageStateNamespace) {
  const triggerDataSourcesSelector = (appState: AppState) =>
    appState[pageStateNamespace].triggerDataSourceSelectorState.dataSources;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]
    ].searchedValue;

  return createSelector(
    [triggerDataSourcesSelector, searchedValueSelector],
    (triggerDataSources: DataSource[], searchedValue: string) =>
      FilterUtils.filterNamedObjectsByName(triggerDataSources, searchedValue)
  );
}