import { AbstractAction } from 'oo-redux-utils2';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';

export default class AbstractTriggerDataSourceSelectorAction extends AbstractAction<
  TriggerDataSourceSelectorState,
  TriggersPageStateNamespace
> {}
