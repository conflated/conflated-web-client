import OOReduxUtils from 'oo-redux-utils2';
import { TriggersPageState } from './TriggersPageState';
import { TriggersPageStateNamespace } from './TriggersPageStateNamespace';
import AbstractTriggersPageAction from '../actions/AbstractTriggersPageAction';

const initialTriggersPageState: TriggersPageState = {
  shouldShowTriggerDetailsDialog: false
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggersPageState, TriggersPageStateNamespace>(
    initialTriggersPageState,
    AbstractTriggersPageAction,
    stateNamespace
  );
