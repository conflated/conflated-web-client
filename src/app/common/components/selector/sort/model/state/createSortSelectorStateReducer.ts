import OOReduxUtils from 'oo-redux-utils2';
import type { SortSelectorState } from './SortSelectorState';
import AbstractSortSelectorAction from '../actions/AbstractSortSelectorAction';
import type { SortSelectorStateNamespace } from './types/SortSelectorStateNamespace';

const initialSortSelectorState: SortSelectorState = {
  lastUsedSortDirection: 'ASC',
  sortsAreShown: true
};

export default (stateNamespace: SortSelectorStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SortSelectorState, SortSelectorStateNamespace>(
    initialSortSelectorState,
    AbstractSortSelectorAction,
    stateNamespace
  );
