import OOReduxUtils from 'oo-redux-utils2';
import AbstractSelectorWithTitleActionsAction from '../actions/AbstractSelectorWithTitleActionsAction';
import type { SelectorWithTitleActionsState } from './SelectorWithTitleActionsState';
import type { SelectorWithTitleActionsStateNamespace } from './types/SelectorWithTitleActionsStateNamespace';

const initialSelectorWithDefaultActionsState: SelectorWithTitleActionsState = {
  isListItemReorderModeActive: false,
  isSelectorMaximized: false,
  isSearchInputShown: false,
  searchedValue: ''
};

export default (stateNamespace: SelectorWithTitleActionsStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SelectorWithTitleActionsState, SelectorWithTitleActionsStateNamespace>(
    initialSelectorWithDefaultActionsState,
    AbstractSelectorWithTitleActionsAction,
    stateNamespace
  );
