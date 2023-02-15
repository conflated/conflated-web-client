import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import SelectTriggerAction from './model/actions/SelectTriggerAction';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import createTriggersSelector from './model/state/selector/createTriggersSelector';
import selectorStateNamespaces from '../../../selector/model/state/types/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../selectorwithdefaultactions/selectorWithDefaultActionsController';

class TriggerSelectorController extends Controller<TriggersPageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: TriggersPageStateNamespace) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerSelectorState, {
      triggers: createTriggersSelector(pageStateNamespace)(appState),

      isTriggerDataSourceSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
          .isSelectorOpen,

      isTriggerGroupSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
          .isSelectorOpen
    });
  }

  getActionDispatchers(stateNamespace: TriggersPageStateNamespace) {
    return {
      selectTrigger: (trigger: string) => this.dispatch(new SelectTriggerAction(stateNamespace, trigger)),

      toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
        selectorWithDefaultActionsStateNamespaces[`${stateNamespace}TriggerSelector`]
      ).toggleMaximizeSelector
    };
  }
}

export const controller = new TriggerSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
