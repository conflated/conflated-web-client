import OOReduxUtils from 'oo-redux-utils';
import type { TriggerGroupSelectorState } from '../TriggerGroupSelectorState';
import AbstractTriggerGroupSelectorAction from '../../actions/AbstractTriggerGroupSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';

const initialAlertGroupSelectorState: TriggerGroupSelectorState = {
  selectedTriggerGroups: []
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerGroupSelectorState, TriggersPageStateNamespace>(
    initialAlertGroupSelectorState,
    [AbstractTriggerGroupSelectorAction, undefined],
    stateNamespace
  );
