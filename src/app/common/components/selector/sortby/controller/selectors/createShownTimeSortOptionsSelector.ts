import { createSelector } from 'reselect';
import type { TimeSortOption } from '../../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { AppState } from '../../../../../../../store/AppState';
import type { SortBySelectorPageStateNamespace } from '../../model/state/types/SortBySelectorPageStateNamespace';
import selectorWithActionsStateNamespaces from '../../../withactions/model/state/types/SelectorWithActionsStateNamespace';

export default function (pageStateNamespace: SortBySelectorPageStateNamespace) {
  const timeSortOptionsSelector = (appState: AppState) =>
    appState[pageStateNamespace].sortBySelectorState.timeSortOptions;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${pageStateNamespace}SortBySelector`]
    ].searchedValue;

  return createSelector(
    [timeSortOptionsSelector, searchedValueSelector],
    (timeSortOptions: TimeSortOption[], searchedValue: string) =>
      timeSortOptions.filter(
        (timeSortOption: TimeSortOption) => !searchedValue || (searchedValue && timeSortOption.includes(searchedValue))
      )
  );
}
