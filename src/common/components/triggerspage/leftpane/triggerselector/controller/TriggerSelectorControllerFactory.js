// @flow

import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { TriggersPageStateNamespace } from '../../../model/state/namespace/TriggersPageStateNamespace';
import SelectTriggerAction from '../model/actions/SelectTriggerAction';

export default class TriggerSelectorControllerFactory extends NamespacedControllerFactory<TriggersPageStateNamespace> {
  createController = () => ({
    selectTrigger: (trigger: string) =>
      this.dispatchAction(new SelectTriggerAction(this.stateNamespace, trigger))
  });
}
