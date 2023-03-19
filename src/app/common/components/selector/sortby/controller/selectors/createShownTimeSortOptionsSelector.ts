import { createSelector } from 'reselect';
import type { TimeSortOption } from '../../../../chartarea/chart/model/state/selectedsortbys/selectedsortby/types/TimeSortOption';
import type { AppState } from '../../../../../../../store/AppState';
import type { SortBySelectorStateNamespace } from '../../model/state/types/SortBySelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../../withactions/model/state/types/SelectorWithActionsStateNamespace';

export default function (stateNamespace: SortBySelectorStateNamespace) {
  const timeSortOptionsSelector = (appState: AppState) => appState[stateNamespace].sortBySelectorState.timeSortOptions;

  const searchedValueSelector = (appState: AppState) =>
    appState.common.selectorWithDefaultActionsStates[
      selectorWithActionsStateNamespaces[`${stateNamespace}SortBySelector`]
    ].searchedValue;

  return createSelector(
    [timeSortOptionsSelector, searchedValueSelector],
    (timeSortOptions: TimeSortOption[], searchedValue: string) =>
      timeSortOptions.filter(
        (timeSortOption: TimeSortOption) => !searchedValue || (searchedValue && timeSortOption.includes(searchedValue))
      )
  );
}
