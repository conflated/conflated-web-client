import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import store from '../../../../../../../../store/store';

export default abstract class AbstractTriggerDataSourceSelectorAction extends AbstractCompositeAction<
  TriggerDataSourceSelectorState,
  TriggersPageStateNamespace
> {
  constructor(triggersPageStateNamespace: TriggersPageStateNamespace) {
    super(triggersPageStateNamespace, createActionDispatcher(store.dispatch));
  }
}
