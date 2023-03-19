import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import StartFetchDataSourcesAction from '../model/actions/StartFetchDataSourcesAction';
import ConfirmDataSourceSelectionAction from '../model/actions/ConfirmDataSourceSelectionAction';
import HideDataSourceChangeConfirmationAction from '../model/actions/HideDataSourceChangeConfirmationAction';
import SelectDataSourceToBeConfirmedAction from '../model/actions/SelectDataSourceToBeConfirmedAction';
import diContainer from '../../../../../../di/diContainer';
import type { DataSource } from '../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import store from '../../../../../../store/store';
import { AppState } from '../../../../../../store/AppState';
import selectShownDataSources from './selectors/selectShownDataSources';
import { controller as selectorWithDefaultActionsController } from '../../../../../common/components/selector/withactions/controller/selectorWithActionsController';
import { ChartAreaStateNamespace } from '../../../../../common/components/chartarea/model/state/types/ChartAreaStateNamespace';

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

    selectDataSourceToBeConfirmed: (dataSource: DataSource) =>
      this.dispatch(new SelectDataSourceToBeConfirmedAction(dataSource)),

    confirmDataSourceSelection: (dataSource: DataSource | null) =>
      this.dispatch(new ConfirmDataSourceSelectionAction(dataSource)),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dataSourceSelector').toggleMaximizeSelector
  };
}

export const controller = new DataSourceSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
