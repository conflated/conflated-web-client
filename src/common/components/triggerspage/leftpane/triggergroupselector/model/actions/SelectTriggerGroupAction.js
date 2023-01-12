// @flow

import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import AbstractTriggerGroupSelectorAction from './AbstractTriggerGroupSelectorAction';
import type { TriggerGroupSelectorState } from '../state/TriggerGroupSelectorState';

export default class SelectTriggerGroupAction extends AbstractTriggerGroupSelectorAction {
  +triggerGroup: string;

  constructor(stateNamespace: TriggersPageStateNamespace, triggerGroup: string) {
    super(stateNamespace);
    this.triggerGroup = triggerGroup;
  }

  performActionAndReturnNewState(currentState: TriggerGroupSelectorState): TriggerGroupSelectorState {
    return {
      ...currentState,
      selectedTriggerGroups: [this.triggerGroup]
    };
  }
}
