import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddSelectDimensionToSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selected/add/selecteddimension/AddSelectDimensionToSelectedChartAction';
import RemoveSelectedDimensionFromSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selected/remove/RemoveSelectedDimensionFromSelectedChartAction';
import ChangeSelectedDimensionColorForSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selected/change/selecteddimension/ChangeSelectedDimensionColorForSelectedChartAction';
import type { DimensionVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Dimension } from '../model/state/types/Dimension';
import type { SelectedDimension } from '../../../../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import type { Measure } from '../../measure/model/state/types/Measure';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import selectShownMeasures from '../../measure/controller/selectors/selectShownMeasures';
import createShownDimensionsSelector from './selectors/createShownDimensionsSelector';
import { controller as selectorWithDefaultActionsController } from '../../../../../../../common/components/selector/withactions/controller/selectorWithActionsController';
import { DataSource } from '../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import StartFetchMeasuresAction from '../../measure/model/actions/StartFetchMeasuresAction';
import diContainer from '../../../../../../../../di/diContainer';

export default class DimensionSelectorController extends Controller {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.dimensionSelectorState, {
      shownMeasures: selectShownMeasures(appState),
      shownDimensions: createShownDimensionsSelector(true)(appState),
      charts: appState.dataExplorerPage.chartAreaState.charts,
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
      isMeasureSelectorOpen: appState.common.selectorStates.measureSelector.isSelectorOpen,
      theme: appState.dataExplorerPage.settingsState.theme
    });

  actionDispatchers = {
    addSelectedDimensionToSelectedChart: (
      dimension: Dimension | Measure,
      visualizationType?: DimensionVisualizationType
    ) => this.dispatch(new AddSelectDimensionToSelectedChartAction('dataExplorerPage', dimension, visualizationType)),

    startFetchMeasures: (dataSource: DataSource, dimension: Dimension) =>
      this.dispatchWithDi(StartFetchMeasuresAction, diContainer, { dataSource, dimension }),

    removeSelectedDimensionFromSelectedChart: (selectedDimension: SelectedDimension) =>
      this.dispatch(new RemoveSelectedDimensionFromSelectedChartAction('dataExplorerPage', selectedDimension)),

    changeSelectedDimensionColorForSelectedChart: (selectedDimension: SelectedDimension, color: string) =>
      this.dispatch(
        new ChangeSelectedDimensionColorForSelectedChartAction('dataExplorerPage', selectedDimension, color)
      ),

    toggleMaximizeSelector:
      selectorWithDefaultActionsController.getActionDispatchers('dimensionSelector').toggleMaximizeSelector
  };
}

export const controller = new DimensionSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
