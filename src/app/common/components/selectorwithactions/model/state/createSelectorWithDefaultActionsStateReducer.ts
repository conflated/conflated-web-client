import OOReduxUtils from 'oo-redux-utils2';
import AbstractSelectorWithActionsAction from '../actions/AbstractSelectorWithActionsAction';
import type { SelectorWithDefaultActionsState } from './SelectorWithDefaultActionsState';
import type { SelectorWithActionsStateNamespace } from './types/SelectorWithActionsStateNamespace';

const initialSelectorWithDefaultActionsState: SelectorWithDefaultActionsState = {
  isSelectorMaximized: false,
  isSearchInputShown: false,
  searchedValue: ''
};

export default (stateNamespace: SelectorWithActionsStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SelectorWithDefaultActionsState, SelectorWithActionsStateNamespace>(
    initialSelectorWithDefaultActionsState,
    AbstractSelectorWithActionsAction,
    stateNamespace
  );
