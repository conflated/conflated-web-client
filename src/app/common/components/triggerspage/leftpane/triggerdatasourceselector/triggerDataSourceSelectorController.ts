import OOReduxUtils from 'oo-redux-utils2';
import ToggleShouldShowPagePanePermanentlyAction from '../../../page/model/actions/panevisibility/ToggleShouldShowPagePanePermanentlyAction';
import SelectTriggerDataSourceAction from './model/actions/SelectTriggerDataSourceAction';
import StartFetchTriggerDataSourcesAction from './model/actions/StartFetchTriggerDataSourcesAction';
import diContainer from '../../../../../../di/diContainer';
import type { TriggersPageStateNamespace } from '../../model/state/namespace/TriggersPageStateNamespace';
import type { DataSource } from '../../../../model/state/datasource/DataSource';
import { AppState } from '../../../../../../store/AppState';
import createShownTriggerDataSourcesSelector from './model/state/selector/createShownTriggerDataSourcesSelector';
import Controller from '../../../../../../Controller';
import selectorStateNamespaces from '../../../selector/model/state/namespace/SelectorStateNamespace';
import { PageStateNamespace } from '../../../page/model/state/types/PageStateNamespace';
import store from '../../../../../../store/store';
import selectorWithDefaultActionsStateNamespaces from '../../../selectorwithdefaultactions/model/state/namespace/SelectorWithDefaultActionsStateNamespace';
import { controller as selectorWithDefaultActionsController } from '../../../selectorwithdefaultactions/selectorWithDefaultActionsController';

class TriggerDataSourceSelectorController extends Controller<PageStateNamespace> {
  getState(appState: AppState, pageStateNamespace: TriggersPageStateNamespace) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].triggerDataSourceSelectorState, {
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
  }

  getActionDispatchers(stateNamespace: TriggersPageStateNamespace) {
    return {
      selectTriggerDataSource: (dataSource: DataSource) =>
        this.dispatch(new SelectTriggerDataSourceAction(stateNamespace, dataSource)),

      startFetchTriggerDataSources: () => this.dispatchWithDi(diContainer, StartFetchTriggerDataSourcesAction, {}),

      toggleShouldShowTriggersPageLeftPanePermanently: () =>
        this.dispatch(new ToggleShouldShowPagePanePermanentlyAction(stateNamespace, 'leftPane')),

      toggleMaximizeSelector: selectorWithDefaultActionsController.getActionDispatchers(
        selectorWithDefaultActionsStateNamespaces[`${stateNamespace}TriggerDataSourceSelector`]
      ).toggleMaximizeSelector
    };
  }
}

export const controller = new TriggerDataSourceSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
