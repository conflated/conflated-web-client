// @flow

import { NamespacedControllerFactory } from 'oo-redux-utils';
import HidePagePaneAction from '../../../page/model/actions/panevisibility/HidePagePaneAction';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';

export default class TriggersPageLeftPaneControllerFactory extends NamespacedControllerFactory<TriggersPageStateNamespace> {
  createController = () => ({
    hideTriggersPageLeftPane: () =>
      this.dispatchAction(new HidePagePaneAction(this.stateNamespace, 'leftPane'))
  });
}
