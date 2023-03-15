import OOReduxUtils from 'oo-redux-utils2';
import type { TriggerSelectorState } from './TriggerSelectorState';
import AbstractTriggerSelectorAction from '../actions/AbstractTriggerSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

const initialTriggerSelectorState: TriggerSelectorState = {
  selectedTriggers: []
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerSelectorState, TriggersPageStateNamespace>(
    initialTriggerSelectorState,
    AbstractTriggerSelectorAction,
    stateNamespace
  );
