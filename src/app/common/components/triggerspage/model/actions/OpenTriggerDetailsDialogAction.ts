import AbstractTriggersPageAction from './AbstractTriggersPageAction';
import { TriggersPageState } from '../state/TriggersPageState';

export default class OpenTriggerDetailsDialogAction extends AbstractTriggersPageAction {
  perform(currentState: TriggersPageState): TriggersPageState {
    return {
      ...currentState,
      shouldShowTriggerDetailsDialog: true
    };
  }
}
