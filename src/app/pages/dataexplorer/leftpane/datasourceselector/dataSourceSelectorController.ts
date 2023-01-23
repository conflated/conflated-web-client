import OOReduxUtils from 'oo-redux-utils';
import StartFetchDataSourcesAction from './model/actions/StartFetchDataSourcesAction';
import ConfirmDataSourceSelectionAction from './model/actions/ConfirmDataSourceSelectionAction';
import HideDataSourceChangeConfirmationAction from './model/actions/HideDataSourceChangeConfirmationAction';
import SelectDataSourceToBeConfirmedAction from './model/actions/SelectDataSourceToBeConfirmedAction';
import diContainer from '../../../../../di/diContainer';
import type { DataSource } from '../../../../common/model/state/datasource/DataSource';
import ChangeDataSourceForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/datasource/ChangeDataSourceForSelectedChartAction';
import StartFetchDimensionsAction from '../dimensionselector/model/actions/StartFetchDimensionsAction';
import StartFetchMeasuresAction from '../measureselector/model/actions/StartFetchMeasuresAction';
import store from '../../../../../store/store';
import Controller from '../../../../../Controller';
import { ChartAreaPageStateNamespace } from '../../../../common/components/chartarea/model/state/namespace/ChartAreaPageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import selectShownDataSources from './model/selectors/selectShownDataSources';

class DataSourceSelectorController extends Controller<ChartAreaPageStateNamespace | ''> {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dataSourceSelectorState, {
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      shownDataSources: selectShownDataSources(appState),
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
      isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen
    });
  }

  getActionDispatchers() {
    return {
      startFetchDataSources: () => this.dispatchWithDi(diContainer, StartFetchDataSourcesAction, {}),
      hideDataSourceChangeConfirmation: () => this.dispatch(new HideDataSourceChangeConfirmationAction()),

      selectDataSourceToBeConfirmed: (dataSource: DataSource) =>
        this.dispatch(new SelectDataSourceToBeConfirmedAction(dataSource)),

      confirmDataSourceSelection: (dataSource: DataSource | null) => {
        if (dataSource) {
          this.dispatch(new ConfirmDataSourceSelectionAction());
          this.dispatch(new ChangeDataSourceForSelectedChartAction('dataExplorerPage', dataSource));
          this.dispatchWithDi(diContainer, StartFetchDimensionsAction, { dataSource });
          this.dispatchWithDi(diContainer, StartFetchMeasuresAction, { dataSource });
        }
      },

      toggleMaximizeSelector: new SelectorWithDefaultActionsController().getActionDispatchers('dataSourceSelector')
        .toggleMaximizeSelector
    };
  }
}

export const controller = new DataSourceSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
