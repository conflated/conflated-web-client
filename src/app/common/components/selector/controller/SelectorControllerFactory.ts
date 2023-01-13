import { NamespacedControllerFactory } from 'oo-redux-utils';
import ToggleSelectorOpenAction from '../model/actions/ToggleSelectorOpenAction';
import type { SelectorStateNamespace } from '../model/state/namespace/SelectorStateNamespace';

export default class SelectorControllerFactory extends NamespacedControllerFactory<SelectorStateNamespace> {
  createController = () => ({
    toggleSelectorOpen: () => {
      this.dispatchAction(new ToggleSelectorOpenAction(this.stateNamespace));
    }
  });
}
