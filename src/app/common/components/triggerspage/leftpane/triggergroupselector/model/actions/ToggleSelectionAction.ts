import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import AbstractTriggerGroupSelectorAction from './AbstractTriggerGroupSelectorAction';
import type { TriggerGroupSelectorState } from '../state/TriggerGroupSelectorState';
import { without } from '../../../../../../utils/Utils';

export default class ToggleSelectionAction extends AbstractTriggerGroupSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly triggerGroup: string) {
    super(stateNamespace);
  }

  perform(currentState: TriggerGroupSelectorState): TriggerGroupSelectorState {
    const { selectedTriggerGroups } = currentState;
    let newState;

    if (selectedTriggerGroups.includes(this.triggerGroup)) {
      newState = {
        ...currentState,
        selectedTriggerGroups: selectedTriggerGroups.filter(without(this.triggerGroup))
      };
    } else {
      newState = {
        ...currentState,
        selectedTriggerGroups: [...selectedTriggerGroups, this.triggerGroup]
      };
    }

    return newState;
  }
}
