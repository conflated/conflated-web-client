import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDataSourcesAction from '../model/actions/StartFetchDataSourcesAction';
import ConfirmDataSourceSelectionAction from '../model/actions/ConfirmDataSourceSelectionAction';
import HideDataSourceChangeConfirmationAction from '../model/actions/HideDataSourceChangeConfirmationAction';
import SelectDataSourceToBeConfirmedAction from '../model/actions/SelectDataSourceToBeConfirmedAction';
import diContainer from '../../../../../../../../di/diContainer';
import type { DataSource } from '../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import selectShownDataSources from './selectors/selectShownDataSources';
import { controller as selectorWithDefaultActionsController } from '../../../../../../../common/components/selector/withtitleactions/controller/selectorWithTitleActionsController';
import { ChartAreaStateNamespace } from '../../../../../../../common/components/chartarea/model/state/types/ChartAreaStateNamespace';
import { Chart } from '../../../../../../../common/components/chartarea/chart/model/state/Chart';
import ToggleSelectorOpenAction from '../../../../../../../common/components/selector/model/actions/ToggleSelectorOpenAction';
import { SelectorStateNamespace } from '../../../../../../../common/components/selector/model/state/types/SelectorStateNamespace';

class DataSourceSelectorController extends Controller<ChartAreaStateNamespace | ''> {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dataSourceSelectorState, {
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      shownDataSources: selectShownDataSources(appState),
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
      isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen
    });

  actionDispatchers = {
    startFetchDataSources: () => this.dispatchWithDi(StartFetchDataSourcesAction, diContainer, {}),
    hideDataSourceChangeConfirmation: () => this.dispatch(new HideDataSourceChangeConfirmationAction()),

    toggleSelectorOpen: (selectorStateNamespace: SelectorStateNamespace) =>
      this.dispatch(new ToggleSelectorOpenAction(selectorStateNamespace)),

    selectDataSourceToBeConfirmed: (dataSource: DataSource) =>
      this.dispatch(new SelectDataSourceToBeConfirmedAction(dataSource)),

    confirmDataSourceSelection: (dataSource: DataSource | null, selectedChart: Chart) =>
      this.dispatch(new ConfirmDataSourceSelectionAction(dataSource, selectedChart)),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dataSourceSelector').toggleMaximizeSelector
  };
}

export const controller = new DataSourceSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
