import { AbstractAction } from 'oo-redux-utils2';
import type { TriggerSelectorState } from '../state/TriggerSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default abstract class AbstractTriggerSelectorAction extends AbstractAction<
  TriggerSelectorState,
  TriggersPageStateNamespace
> {}
