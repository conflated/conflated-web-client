import { AbstractAction } from 'oo-redux-utils';
import type { TriggerGroupSelectorState } from '../state/TriggerGroupSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';

export default class AbstractTriggerGroupSelectorAction extends AbstractAction<
  TriggerGroupSelectorState,
  TriggersPageStateNamespace
> {}
