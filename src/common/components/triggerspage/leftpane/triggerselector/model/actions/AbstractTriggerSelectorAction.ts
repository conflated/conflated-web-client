import { AbstractAction } from 'oo-redux-utils';
import type { TriggerSelectorState } from '../state/TriggerSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';

export default class AbstractTriggerSelectorAction extends AbstractAction<
  TriggerSelectorState,
  TriggersPageStateNamespace
> {}
