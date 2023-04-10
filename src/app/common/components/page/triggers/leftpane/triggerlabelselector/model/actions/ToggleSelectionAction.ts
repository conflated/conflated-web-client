import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import AbstractTriggerLabelSelectorAction from './AbstractTriggerLabelSelectorAction';
import type { TriggerLabelSelectorState } from '../state/TriggerLabelSelectorState';
import { isNot } from '../../../../../../../utils/Utils';

export default class ToggleSelectionAction extends AbstractTriggerLabelSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly triggerGroup: string) {
    super(stateNamespace);
  }

  perform(currentState: TriggerLabelSelectorState): TriggerLabelSelectorState {
    const { selectedTriggerGroups } = currentState;
    let newState;

    if (selectedTriggerGroups.includes(this.triggerGroup)) {
      newState = {
        ...currentState,
        selectedTriggerGroups: selectedTriggerGroups.filter(isNot(this.triggerGroup))
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
