// @flow

import { NamespacedControllerFactory } from 'oo-redux-utils';
import SelectTriggerGroupAction from '../model/actions/SelectTriggerGroupAction';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';

export default class TriggerGroupSelectorControllerFactory extends NamespacedControllerFactory<TriggersPageStateNamespace> {
  createController = () => ({
    selectTriggerGroup: (triggerGroup: string) =>
      this.dispatchAction(new SelectTriggerGroupAction(this.stateNamespace, triggerGroup))
  });
}
