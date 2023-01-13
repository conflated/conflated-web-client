import OOReduxUtils from 'oo-redux-utils';
import type { TriggerSelectorState } from '../TriggerSelectorState';
import AbstractTriggerSelectorAction from '../../actions/AbstractTriggerSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';

const initialAlertSelectorState: TriggerSelectorState = {
  selectedTriggers: []
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerSelectorState, TriggersPageStateNamespace>(
    initialAlertSelectorState,
    [AbstractTriggerSelectorAction, undefined],
    stateNamespace
  );
