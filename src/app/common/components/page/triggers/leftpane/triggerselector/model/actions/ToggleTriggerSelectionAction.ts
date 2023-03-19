import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import AbstractTriggerSelectorAction from './AbstractTriggerSelectorAction';
import type { TriggerSelectorState } from '../state/TriggerSelectorState';
import { without } from '../../../../../../../utils/Utils';

export default class ToggleTriggerSelectionAction extends AbstractTriggerSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly trigger: string) {
    super(stateNamespace);
  }

  perform(currentState: TriggerSelectorState): TriggerSelectorState {
    const { selectedTriggers } = currentState;
    let newState;

    if (selectedTriggers.includes(this.trigger)) {
      newState = {
        ...currentState,
        selectedTriggers: selectedTriggers.filter(without(this.trigger))
      };
    } else {
      newState = {
        ...currentState,
        selectedTriggers: [...selectedTriggers, this.trigger]
      };
    }

    return newState;
  }
}
