import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleSelectionAction from '../model/actions/ToggleSelectionAction';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import createTriggerLabelSelector from './selectors/createTriggerLabelSelector';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../../../selector/withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/TriggerLabelSelectorView';

class TriggerLabelSelectorController extends Controller<TriggersPageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerGroupSelectorState, {
      triggerGroups: createTriggerLabelSelector(pageStateNamespace)(appState),

      isTriggerDataSourceSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerDataSourceSelector`]]
          .isSelectorOpen,

      isTriggerSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
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
