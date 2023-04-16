import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleSelectionAction from '../model/actions/ToggleSelectionAction';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import createTriggerLabelSelector from './selectors/createTriggerLabelSelector';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../../../../selector/withtitleactions/model/state/types/SelectorWithTitleActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../../../selector/withtitleactions/controller/selectorWithTitleActionsController';
import { OwnProps } from '../view/TriggerLabelSelectorView';

class TriggerLabelSelectorController extends Controller<TriggersPageStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[stateNamespace].triggerGroupSelectorState, {
      triggerGroups: createTriggerLabelSelector(stateNamespace)(appState),

      isTriggerDataSourceSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]]
          .isSelectorOpen,

      isTriggerSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}TriggerSelector`]].isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    toggleSelection: (triggerGroup: string) => this.dispatch(new ToggleSelectionAction(stateNamespace, triggerGroup)),

    toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerGroupSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new TriggerLabelSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
