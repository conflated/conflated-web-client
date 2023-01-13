import OOReduxUtils from 'oo-redux-utils';
import type { SelectorState } from '../SelectorState';
import AbstractSelectorAction from '../../actions/AbstractSelectorAction';
import type { SelectorStateNamespace } from '../namespace/SelectorStateNamespace';

const initialSelectorState: SelectorState = {
  isSelectorOpen: true
};

export default (stateNamespace: SelectorStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<SelectorState, SelectorStateNamespace>(
    initialSelectorState,
    [AbstractSelectorAction, undefined],
    stateNamespace
  );
