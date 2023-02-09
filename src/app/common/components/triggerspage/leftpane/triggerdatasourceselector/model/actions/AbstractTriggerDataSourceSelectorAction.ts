import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import dispatch from '../../../../../../../../store/dispatch';

export default abstract class AbstractTriggerDataSourceSelectorAction extends AbstractDispatchingAction<
  TriggerDataSourceSelectorState,
  TriggersPageStateNamespace
> {
  constructor(triggersPageStateNamespace: TriggersPageStateNamespace) {
    super(triggersPageStateNamespace, dispatch);
  }
}
