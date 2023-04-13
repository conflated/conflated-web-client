import OOReduxUtils from 'oo-redux-utils2';
import type { SortBySelectorState } from './SortBySelectorState';
import AbstractSortSelectorAction from '../actions/AbstractSortSelectorAction';
import type { SortSelectorStateNamespace } from './types/SortSelectorStateNamespace';

const initialSortSelectorState: SortBySelectorState = {
  timeSortOptions: [
    'Latest value',
    'Latest increase',
    'Latest decrease',
    'Historical minimum',
    'Historical maximum',
    'Historical average',
    'Historical median',
    'Historical 5th percentile',
    'Historical 25th percentile',
    'Historical 75th percentile',
    'Historical 95th percentile',
    'Historical increase',
    'Historical decrease',
    'Historical max increase',
    'Historical max decrease',
    'Instantaneous increase in history',
    'Instantaneous decrease in history'
  ],
  lastUsedSortDirection: 'ASC',
  areSelectedSortBysShown: true
};

export default (stateNamespace: SortSelectorStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SortBySelectorState, SortSelectorStateNamespace>(
    initialSortSelectorState,
    AbstractSortSelectorAction,
    stateNamespace
  );
