// @flow

import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import AbstractTriggerSelectorAction from './AbstractTriggerSelectorAction';
import type { TriggerSelectorState } from '../state/TriggerSelectorState';

export default class SelectTriggerAction extends AbstractTriggerSelectorAction {
  +trigger: string;

  constructor(stateNamespace: TriggersPageStateNamespace, trigger: string) {
    super(stateNamespace);
    this.trigger = trigger;
  }

  performActionAndReturnNewState(currentState: TriggerSelectorState): TriggerSelectorState {
    return {
      ...currentState,
      selectedTriggers: [this.trigger]
    };
  }
}
