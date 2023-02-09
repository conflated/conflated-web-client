import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import AbstractTriggerSelectorAction from './AbstractTriggerSelectorAction';
import type { TriggerSelectorState } from '../state/TriggerSelectorState';

export default class SelectTriggerAction extends AbstractTriggerSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly trigger: string) {
    super(stateNamespace);
  }

  perform(currentState: TriggerSelectorState): TriggerSelectorState {
    return {
      ...currentState,
      selectedTriggers: [this.trigger]
    };
  }
}
