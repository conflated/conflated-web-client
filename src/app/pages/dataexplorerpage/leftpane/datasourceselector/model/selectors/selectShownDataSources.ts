import { createSelector } from 'reselect';
import type { AppState } from '../../../../../../../store/AppState';
import FilterUtils from '../../../../../../common/model/state/utils/FilterUtils';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';

const dataSourcesSelector = (appState: AppState) => appState.dataExplorerPage.dataSourceSelectorState.dataSources;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.dataSourceSelector.searchedValue;

export default createSelector(
  [dataSourcesSelector, searchedValueSelector],
  (dataSources: DataSource[], searchedValue: string): DataSource[] =>
    FilterUtils.filterNamedObjectsByName(dataSources, searchedValue)
);
