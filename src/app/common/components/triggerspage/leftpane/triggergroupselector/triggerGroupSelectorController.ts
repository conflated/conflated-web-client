import OOReduxUtils from 'oo-redux-utils2';
import SelectTriggerGroupAction from './model/actions/SelectTriggerGroupAction';
import type { TriggersPageStateNamespace } from '../../model/state/TriggersPageStateNamespace';
import Controller from '../../../../../../Controller';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import createTriggerGroupsSelector from './model/state/selectors/createTriggerGroupsSelector';
import selectorStateNamespaces from '../../../selector/model/state/types/SelectorStateNamespace';
import selectorWithDefaultActionsStateNamespaces from '../../../selectorwithdefaultactions/model/state/types/SelectorWithDefaultActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../selectorwithdefaultactions/selectorWithDefaultActionsController';

class TriggerGroupSelectorController extends Controller<TriggersPageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: TriggersPageStateNamespace) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerGroupSelectorState, {
      triggerGroups: createTriggerGroupsSelector(pageStateNamespace)(appState),

      isTriggerDataSourceSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
          .isSelectorOpen,

      isTriggerSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
    });
  }

  getActionDispatchers(stateNamespace: TriggersPageStateNamespace) {
    return {
      selectTriggerGroup: (triggerGroup: string) =>
        this.dispatch(new SelectTriggerGroupAction(stateNamespace, triggerGroup)),

      toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
        selectorWithDefaultActionsStateNamespaces[`${stateNamespace}TriggerGroupSelector`]
      ).toggleMaximizeSelector
    };
  }
}

export const controller = new TriggerGroupSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
