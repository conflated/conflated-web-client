import { ControllerFactory } from 'oo-redux-utils';
import AddSelectedMeasureToSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/add/selectedmeasure/AddSelectedMeasureToSelectedChartAction';
import RemoveSelectedMeasureFromSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/remove/RemoveSelectedMeasureFromSelectedChartAction';
import ChangeSelectedMeasureAggregationFunctionForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureAggregationFunctionForSelectedChartAction';
import ChangeSelectedMeasureColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureColorForSelectedChartAction';
import type { SelectedMeasure } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/SelectedMeasure';
import type { Measure } from '../model/state/entities/Measure';
import type { Dimension } from '../../dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/AggregationFunction';
import type { MeasureVisualizationType } from '../../../../common/components/chartarea/chart/model/state/selectedmeasure/types/MeasureVisualizationType';
import ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selectedmeasure/ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction';
import diContainer from '../../../../diContainer';
import StartFetchDataForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';

export default class MeasureSelectorControllerFactory extends ControllerFactory {
  addSelectedMeasureToSelectedChart(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.dispatchAction(
      new AddSelectedMeasureToSelectedChartAction('dataExplorerPage', measureOrDimension, aggregationFunction)
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {
      stateNamespace: 'dataExplorerPage'
    });
  }

  removeSelectedMeasureFromSelectedChart(selectedMeasure: SelectedMeasure) {
    this.dispatchAction(new RemoveSelectedMeasureFromSelectedChartAction('dataExplorerPage', selectedMeasure));

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {
      stateNamespace: 'dataExplorerPage'
    });
  }

  changeSelectedMeasureAggregationFunctionForSelectedChart(
    selectedMeasure: SelectedMeasure,
    aggregationFunction: AggregationFunction
  ) {
    this.dispatchAction(
      new ChangeSelectedMeasureAggregationFunctionForSelectedChartAction(
        'dataExplorerPage',
        selectedMeasure,
        aggregationFunction
      )
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {
      stateNamespace: 'dataExplorerPage'
    });
  }

  changeSelectedMeasureVisualizationColorForSelectedChart(selectedMeasure: SelectedMeasure, color: string) {
    this.dispatchAction(
      new ChangeSelectedMeasureColorForSelectedChartAction('dataExplorerPage', selectedMeasure, color)
    );
  }

  changeSelectedMeasureVisualizationTypeForSelectedChart(
    selectedMeasure: SelectedMeasure,
    visualizationType: MeasureVisualizationType
  ) {
    this.dispatchAction(
      new ChangeSelectedMeasureVisualizationTypeAndColorForSelectedChartAction(
        'dataExplorerPage',
        selectedMeasure,
        visualizationType
      )
    );
  }

  createController = () => ({
    addSelectedMeasureToSelectedChart: this.addSelectedMeasureToSelectedChart,
    removeSelectedMeasureFromSelectedChart: this.removeSelectedMeasureFromSelectedChart,

    changeSelectedMeasureAggregationFunctionForSelectedChart:
      this.changeSelectedMeasureAggregationFunctionForSelectedChart,

    changeSelectedMeasureVisualizationColorForSelectedChart:
      this.changeSelectedMeasureVisualizationColorForSelectedChart,

    changeSelectedMeasureVisualizationTypeForSelectedChart: this.changeSelectedMeasureVisualizationTypeForSelectedChart
  });
}
