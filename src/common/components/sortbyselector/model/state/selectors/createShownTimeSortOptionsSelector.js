// @flow

import { createSelector } from 'reselect';
import type { OutputSelector } from 'reselect';
import type { TimeSortOption } from '../../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { AppState } from '../../../../../../store/AppState';
import type { SortBySelectorPageStateNamespace } from '../namespace/SortBySelectorPageStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';

export default function(
  pageStateNamespace: SortBySelectorPageStateNamespace
): OutputSelector<AppState, void, TimeSortOption[]> {
  const timeSortOptionsSelector = (appState: AppState) =>
    appState[pageStateNamespace].sortBySelectorState.timeSortOptions;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithDefaultActionsStateNamespaces[`${pageStateNamespace}SortBySelector`]
    ].searchedValue;

  return createSelector(
    [timeSortOptionsSelector, searchedValueSelector],
    (timeSortOptions: TimeSortOption[], searchedValue: string) =>
      timeSortOptions.filter(
        (timeSortOption: TimeSortOption) =>
          !searchedValue || (searchedValue && timeSortOption.includes(searchedValue))
      )
  );
}
