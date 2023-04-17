import { AbstractAction } from 'oo-redux-utils2';
import type { TriggerLabelSelectorState } from '../state/TriggerLabelSelectorState';
import type { TriggersPageStateNamespace } from '../../../../../model/state/TriggersPageStateNamespace';

export default abstract class AbstractTriggerLabelSelectorAction extends AbstractAction<
  TriggerLabelSelectorState,
  TriggersPageStateNamespace
> {}
