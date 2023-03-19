import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import ToggleTriggerSelectionAction from '../model/actions/ToggleTriggerSelectionAction';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import createTriggerSelector from './selector/createTriggerSelector';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../../../selector/withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/TriggerSelectorView';

class TriggerSelectorController extends Controller<TriggersPageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerSelectorState, {
      triggers: createTriggerSelector(pageStateNamespace)(appState),

      isTriggerDataSourceSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
          .isSelectorOpen,

      isTriggerGroupSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
          .isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    toggleSelection: (trigger: string) => this.dispatch(new ToggleTriggerSelectionAction(stateNamespace, trigger)),

    toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new TriggerSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;