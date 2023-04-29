import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddSelectedMeasureToSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selectedmeasure/AddSelectedMeasureToSelectedChartAction';
import RemoveSelectedMeasureFromSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selectedmeasure/RemoveSelectedMeasureFromSelectedChartAction';
import ChangeSelectedMeasureAggregationFunctionForSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selectedmeasure/change/ChangeSelectedMeasureAggregationFunctionForSelectedChartAction';
import ChangeSelectedMeasureColorForSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selectedmeasure/change/ChangeSelectedMeasureColorForSelectedChartAction';
import type { SelectedMeasure } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Measure } from '../model/state/types/Measure';
import type { Dimension } from '../../dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction from '../../../../../../../common/components/chartarea/model/actions/chart/selectedmeasure/change/ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction';
import store from '../../../../../../../../store/store';
import { AppState } from '../../../../../../../../store/AppState';
import selectShownDimensions from '../../dimension/controller/selectors/createShownDimensionsSelector';
import selectShownMeasures from './selectors/selectShownMeasures';
import { controller as selectorWithActionsController } from '../../../../../../../common/components/selector/withtitleactions/controller/selectorWithTitleActionsController';
import { DataSource } from '../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import diContainer from '../../../../../../../../di/diContainer';
import StartFetchDimensionsAction from '../../dimension/model/actions/StartFetchDimensionsAction';

export default class MeasureSelectorController extends Controller {
  getState = (appState: AppState) =>
    OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.measureSelectorState, {
      shownDimensions: selectShownDimensions(false)(appState),
      shownMeasures: selectShownMeasures(appState),
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
      isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen,
      theme: appState.dataExplorerPage.settingsState.theme
    });

  actionDispatchers = {
    addSelectedMeasureToSelectedChart: (
      measureOrDimension: Measure | Dimension,
      aggregationFunction: AggregationFunction,
      visualizationType: MeasureVisualizationType
    ) =>
      this.dispatch(
        new AddSelectedMeasureToSelectedChartAction(
          'dataExplorerPage',
          measureOrDimension,
          aggregationFunction,
          visualizationType
        )
      ),

    startFetchDimensions: (dataSource: DataSource, measure: Measure) =>
      this.dispatchWithDi(StartFetchDimensionsAction, diContainer, {
        dataSource,
        measure
      }),

    removeSelectedMeasureFromSelectedChart: (selectedMeasure: SelectedMeasure) =>
      this.dispatch(new RemoveSelectedMeasureFromSelectedChartAction('dataExplorerPage', selectedMeasure)),

    changeSelectedMeasureAggregationFunctionForSelectedChart: (
      selectedMeasure: SelectedMeasure,
      aggregationFunction: AggregationFunction
    ) =>
      this.dispatch(
        new ChangeSelectedMeasureAggregationFunctionForSelectedChartAction(
          'dataExplorerPage',
          selectedMeasure,
          aggregationFunction
        )
      ),

    changeSelectedMeasureVisualizationColorForSelectedChart: (selectedMeasure: SelectedMeasure, color: string) => {
      this.dispatch(new ChangeSelectedMeasureColorForSelectedChartAction('dataExplorerPage', selectedMeasure, color));
    },

    changeSelectedMeasureVisualizationTypeForSelectedChart: (
      selectedMeasure: SelectedMeasure,
      visualizationType: MeasureVisualizationType
    ) =>
      this.dispatch(
        new ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction(
          'dataExplorerPage',
          selectedMeasure,
          visualizationType
        )
      ),

    toggleMaximizeSelector: selectorWithActionsController.getActionDispatchers('measureSelector').toggleMaximizeSelector
  };
}

export const controller = new MeasureSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = typeof controller.actionDispatchers;
