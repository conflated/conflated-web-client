import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import SelectTriggerDataSourceAction from '../model/actions/SelectTriggerDataSourceAction';
import StartFetchTriggerDataSourcesAction from '../model/actions/StartFetchTriggerDataSourcesAction';
import diContainer from '../../../../../../../di/diContainer';
import type { TriggersPageStateNamespace } from '../../../model/state/TriggersPageStateNamespace';
import type { DataSource } from '../../../../chartarea/chart/model/state/datasource/DataSource';
import { AppState } from '../../../../../../../store/AppState';
import createShownTriggerDataSourcesSelector from './selector/createShownTriggerDataSourcesSelector';
import selectorStateNamespaces from '../../../../selector/model/state/types/SelectorStateNamespace';
import { PageStateNamespace } from '../../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../../store/store';
import selectorWithActionsStateNamespaces from '../../../../selectorwithactions/model/state/types/SelectorWithActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../../selectorwithactions/controller/selectorWithActionsController';
import { OwnProps } from '../view/TriggerDataSourceSelectorView';

class TriggerDataSourceSelectorController extends Controller<PageStateNamespace> {
  getState = (appState: AppState, { pageStateNamespace }: OwnProps) =>
    OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerDataSourceSelectorState, {
      shownDataSources: createShownTriggerDataSourcesSelector(pageStateNamespace)(appState),

      shouldShowTriggersPageLeftPanePermanently:
        appState.common.pageStates[pageStateNamespace].shouldShowPagePanePermanently.leftPane,

      isTriggerGroupSelectorOpen:
        appState.common.selectorStates[
          selectorStateNamespaces[selectorStateNamespaces[`${pageStateNamespace}TriggerGroupSelector`]]
        ].isSelectorOpen,

      isTriggerSelectorOpen:
        appState.common.selectorStates[selectorStateNamespaces[`${pageStateNamespace}TriggerSelector`]].isSelectorOpen
    });

  getActionDispatchers = (stateNamespace: TriggersPageStateNamespace) => ({
    selectTriggerDataSource: (dataSource: DataSource) =>
      this.dispatch(new SelectTriggerDataSourceAction(stateNamespace, dataSource)),

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
