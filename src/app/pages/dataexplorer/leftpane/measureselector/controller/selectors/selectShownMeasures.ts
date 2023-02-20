import { createSelector } from 'reselect';
import FilterUtils from '../../../../../../common/utils/FilterUtils';
import type { AppState } from '../../../../../../../store/AppState';
import type { Measure } from '../../model/state/types/Measure';

const measuresSelector = (appState: AppState) => appState.dataExplorerPage.measureSelectorState.measures;

const searchedValueSelector = (appState: AppState) =>
  appState.common.selectorWithDefaultActionsStates.measureSelector.searchedValue;

export default createSelector(
  [measuresSelector, searchedValueSelector],
  (measures: Measure[], searchedValue: string): Measure[] =>
    FilterUtils.filterNamedObjectsByName(measures, searchedValue)
);
