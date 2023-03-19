import OOReduxUtils from 'oo-redux-utils2';
import AbstractSelectorWithActionsAction from '../actions/AbstractSelectorWithActionsAction';
import type { SelectorWithActionsState } from './SelectorWithActionsState';
import type { SelectorWithActionsStateNamespace } from './types/SelectorWithActionsStateNamespace';

const initialSelectorWithDefaultActionsState: SelectorWithActionsState = {
  isListItemReorderModeActive: false,
  isSelectorMaximized: false,
  isSearchInputShown: false,
  searchedValue: ''
};

export default (stateNamespace: SelectorWithActionsStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SelectorWithActionsState, SelectorWithActionsStateNamespace>(
    initialSelectorWithDefaultActionsState,
    AbstractSelectorWithActionsAction,
    stateNamespace
  );
