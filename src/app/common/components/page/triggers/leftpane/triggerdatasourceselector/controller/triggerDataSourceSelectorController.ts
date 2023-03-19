import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import ToggleTriggerDataSourceSelectionAction from '../model/actions/ToggleTriggerDataSourceSelectionAction';
import StartFetchTriggerDataSourcesAction from '../model/actions/StartFetchTriggerDataSourcesAction';
import diContainer from '../../../../../../../../di/diContainer';
import type { DataSource } from '../../../../../chartarea/chart/model/state/datasource/DataSource';
import { AppState } from '../../../../../../../../store/AppState';
import createShownTriggerDataSourcesSelector from './selector/createShownTriggerDataSourcesSelector';
import selectorStateNamespaces from '../../../../../selector/model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../../../model/state/types/PageStateNamespace';
import store from '../../../../../../../../store/store';
import selectorWithActionsStateNamespaces from '../../../../../selector/withactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../../../selector/withactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/TriggerDataSourceSelectorView';
import { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';

class TriggerDataSourceSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { stateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[stateNamespace].triggerDataSourceSelectorState, {
      shownDataSources: createShownTriggerDataSourcesSelector(stateNamespace)(appState),

      shouldShowTriggersPageLeftPanePermanently:
        appState.common.pageStates[stateNamespace].shouldShowPagePanePermanently.leftPane,

      isTriggerGroupSelectorOpen:
        appState.common.selectorStates[
          selectorStateNamespaces[selectorStateNamespaces[`${stateNamespace}TriggerGroupSelector`]]
        ].isSelectorOpen,

      isTriggerSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${stateNamespace}TriggerSelector`]].isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    toggleTriggerDataSourceSelection: (dataSource: DataSource) =>
      this.dispatch(new ToggleTriggerDataSourceSelectionAction(stateNamespace, dataSource)),

    startFetchTriggerDataSources: () =>
      this.dispatchWithDi(StartFetchTriggerDataSourcesAction, diContainer, { stateNamespace }),

    toggleShouldShowTriggersPageLeftPanePermanently: () =>
      this.dispatch(new ToggleShouldShowPagePanePermanentlyAction(stateNamespace, 'leftPane')),

    toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
      selectorWithActionsStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]
    ).toggleMaximizeSelector
  });
}

export const controller = new TriggerDataSourceSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
