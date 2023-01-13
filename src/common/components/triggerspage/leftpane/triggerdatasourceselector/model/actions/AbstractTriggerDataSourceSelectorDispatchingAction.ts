import { AbstractDispatchingAction } from 'oo-redux-utils';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';

export default class AbstractTriggerDataSourceSelectorDispatchingAction extends AbstractDispatchingAction<
  TriggerDataSourceSelectorState,
  TriggersPageStateNamespace
> {}
