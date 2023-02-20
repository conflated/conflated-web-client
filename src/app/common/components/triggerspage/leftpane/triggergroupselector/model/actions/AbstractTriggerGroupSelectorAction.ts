import { AbstractAction } from 'oo-redux-utils2';
import type { TriggerGroupSelectorState } from '../state/TriggerGroupSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';

export default abstract class AbstractTriggerGroupSelectorAction extends AbstractAction<
  TriggerGroupSelectorState,
  TriggersPageStateNamespace
> {}
