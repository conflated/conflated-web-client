import OOReduxUtils from 'oo-redux-utils2';
import type { TriggerLabelSelectorState } from './TriggerLabelSelectorState';
import AbstractTriggerLabelSelectorAction from '../actions/AbstractTriggerLabelSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

const initialAlertGroupSelectorState: TriggerLabelSelectorState = {
  selectedTriggerGroups: []
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerLabelSelectorState, TriggersPageStateNamespace>(
    initialAlertGroupSelectorState,
    AbstractTriggerLabelSelectorAction,
    stateNamespace
  );
