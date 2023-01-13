import OOReduxUtils from 'oo-redux-utils';
import type { SortBySelectorState } from '../SortBySelectorState';
import AbstractSortBySelectorAction from '../../actions/AbstractSortBySelectorAction';
import type { SortBySelectorPageStateNamespace } from '../namespace/SortBySelectorPageStateNamespace';

const initialSortBySelectorState: SortBySelectorState = {
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

export default (stateNamespace: SortBySelectorPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SortBySelectorState, SortBySelectorPageStateNamespace>(
    initialSortBySelectorState,
    [AbstractSortBySelectorAction, undefined],
    stateNamespace
  );
