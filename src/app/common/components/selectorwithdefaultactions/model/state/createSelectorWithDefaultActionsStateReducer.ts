import OOReduxUtils from 'oo-redux-utils2';
import AbstractSelectorWithDefaultActionsAction from '../actions/AbstractSelectorWithDefaultActionsAction';
import type { SelectorWithDefaultActionsState } from './SelectorWithDefaultActionsState';
import type { SelectorWithDefaultActionsStateNamespace } from './types/SelectorWithDefaultActionsStateNamespace';

const initialSelectorWithDefaultActionsState: SelectorWithDefaultActionsState = {
  isSelectorMaximized: false,
  isSearchInputShown: false,
  searchedValue: ''
};

export default (stateNamespace: SelectorWithDefaultActionsStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SelectorWithDefaultActionsState, SelectorWithDefaultActionsStateNamespace>(
    initialSelectorWithDefaultActionsState,
    AbstractSelectorWithDefaultActionsAction,
    stateNamespace
  );
