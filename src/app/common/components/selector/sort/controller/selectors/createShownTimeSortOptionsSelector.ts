import { createSelector } from 'reselect';
import type { TimeSortOption } from '../../../../chartarea/chart/model/state/sorts/sort/types/TimeSortOption';
import type { AppState } from '../../../../../../../store/AppState';
import type { SortSelectorStateNamespace } from '../../model/state/types/SortSelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../../withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';

export default function (stateNamespace: SortSelectorStateNamespace) {
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
