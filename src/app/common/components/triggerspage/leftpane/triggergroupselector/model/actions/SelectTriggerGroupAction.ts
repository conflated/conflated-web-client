import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import AbstractTriggerGroupSelectorAction from './AbstractTriggerGroupSelectorAction';
import type { TriggerGroupSelectorState } from '../state/TriggerGroupSelectorState';

export default class SelectTriggerGroupAction extends AbstractTriggerGroupSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly triggerGroup: string) {
    super(stateNamespace);
  }

  perform(currentState: TriggerGroupSelectorState): TriggerGroupSelectorState {
    return {
      ...currentState,
      selectedTriggerGroups: [this.triggerGroup]
    };
  }
}
