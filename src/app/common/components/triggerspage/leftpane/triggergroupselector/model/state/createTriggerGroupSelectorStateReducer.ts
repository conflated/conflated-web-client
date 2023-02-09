import OOReduxUtils from 'oo-redux-utils2';
import type { TriggerGroupSelectorState } from './TriggerGroupSelectorState';
import AbstractTriggerGroupSelectorAction from '../actions/AbstractTriggerGroupSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

const initialAlertGroupSelectorState: TriggerGroupSelectorState = {
  selectedTriggerGroups: []
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerGroupSelectorState, TriggersPageStateNamespace>(
    initialAlertGroupSelectorState,
    AbstractTriggerGroupSelectorAction,
    stateNamespace
  );
