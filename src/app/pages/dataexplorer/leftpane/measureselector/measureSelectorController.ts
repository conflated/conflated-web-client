import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import AddSelectedMeasureToSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/add/selectedmeasure/AddSelectedMeasureToSelectedChartAction';
import RemoveSelectedMeasureFromSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/remove/RemoveSelectedMeasureFromSelectedChartAction';
import ChangeSelectedMeasureAggregationFunctionForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureAggregationFunctionForSelectedChartAction';
import ChangeSelectedMeasureColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureColorForSelectedChartAction';
import type { SelectedMeasure } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Measure } from './model/state/entities/Measure';
import type { Dimension } from '../dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction';
import diContainer from '../../../../../di/diContainer';
import StartFetchDataForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import { ChartAreaPageStateNamespace } from '../../../../common/components/chartarea/model/state/types/ChartAreaPageStateNamespace';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import selectShownDimensions from '../../../../common/selectors/createShownDimensionsSelector';
import selectShownMeasures from '../../../../common/selectors/selectShownMeasures';
import { controller as selectorWithActionsController } from '../../../../common/components/selectorwithactions/controller/selectorWithActionsController';

export default class MeasureSelectorController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState) {
    return OOReduxUtils.mergeOwnAndForeignState(appState.dataExplorerPage.measureSelectorState, {
      shownDimensions: selectShownDimensions(false)(appState),
      shownMeasures: selectShownMeasures(appState),
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart,
      isLayoutSelectorOpen: appState.common.selectorStates.layoutSelector.isSelectorOpen,
      isChartTypeSelectorOpen: appState.common.selectorStates.chartTypeSelector.isSelectorOpen,
      isDataSourceSelectorOpen: appState.common.selectorStates.dataSourceSelector.isSelectorOpen,
      isDimensionSelectorOpen: appState.common.selectorStates.dimensionSelector.isSelectorOpen,
      theme: appState.dataExplorerPage.settingsState.theme
    });
  }

  getActionDispatchers() {
    return {
      addSelectedMeasureToSelectedChart: (
        measureOrDimension: Measure | Dimension,
        aggregationFunction: AggregationFunction
      ) => {
        this.dispatch(
          new AddSelectedMeasureToSelectedChartAction('dataExplorerPage', measureOrDimension, aggregationFunction)
        );

        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
          stateNamespace: 'dataExplorerPage'
        });
      },

      removeSelectedMeasureFromSelectedChart: (selectedMeasure: SelectedMeasure) => {
        this.dispatch(new RemoveSelectedMeasureFromSelectedChartAction('dataExplorerPage', selectedMeasure));

        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
          stateNamespace: 'dataExplorerPage'
        });
      },

      changeSelectedMeasureAggregationFunctionForSelectedChart: (
        selectedMeasure: SelectedMeasure,
        aggregationFunction: AggregationFunction
      ) => {
        this.dispatch(
          new ChangeSelectedMeasureAggregationFunctionForSelectedChartAction(
            'dataExplorerPage',
            selectedMeasure,
            aggregationFunction
          )
        );

        this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
          stateNamespace: 'dataExplorerPage'
        });
      },

      changeSelectedMeasureVisualizationColorForSelectedChart: (selectedMeasure: SelectedMeasure, color: string) => {
        this.dispatch(new ChangeSelectedMeasureColorForSelectedChartAction('dataExplorerPage', selectedMeasure, color));
      },

      changeSelectedMeasureVisualizationTypeForSelectedChart: (
        selectedMeasure: SelectedMeasure,
        visualizationType: MeasureVisualizationType
      ) => {
        this.dispatch(
          new ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction(
            'dataExplorerPage',
            selectedMeasure,
            visualizationType
          )
        );
      },

      toggleMaximizeSelector:
        selectorWithActionsController.getActionDispatchers('measureSelector').toggleMaximizeSelector
    };
  }
}

export const controller = new MeasureSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
