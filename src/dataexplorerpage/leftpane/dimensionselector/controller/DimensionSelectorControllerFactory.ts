import { ControllerFactory } from 'oo-redux-utils';
import AddSelectDimensionToSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/add/selecteddimension/AddSelectDimensionToSelectedChartAction';
import RemoveSelectedDimensionFromSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/remove/RemoveSelectedDimensionFromSelectedChartAction';
import ChangeSelectedDimensionColorForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/selecteddimension/ChangeSelectedDimensionColorForSelectedChartAction';
import type { DimensionVisualizationType } from '../../../../common/components/chartarea/chart/model/state/selecteddimension/types/DimensionVisualizationType';
import type { Dimension } from '../model/state/entities/Dimension';
import type { SelectedDimension } from '../../../../common/components/chartarea/chart/model/state/selecteddimension/SelectedDimension';
import diContainer from '../../../../diContainer';
import StartFetchDataForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/fetchdata/StartFetchDataForSelectedChartAction';
import type { Measure } from '../../measureselector/model/state/entities/Measure';

export default class DimensionSelectorControllerFactory extends ControllerFactory {
  addSelectedDimensionToSelectedChart(
    dimension: Dimension | Measure,
    possibleVisualizationType?: DimensionVisualizationType
  ) {
    this.dispatchAction(
      new AddSelectDimensionToSelectedChartAction('dataExplorerPage', dimension, possibleVisualizationType)
    );

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {
      stateNamespace: 'dataExplorerPage'
    });
  }

  removeSelectedDimensionFromSelectedChart(selectedDimension: SelectedDimension) {
    this.dispatchAction(new RemoveSelectedDimensionFromSelectedChartAction('dataExplorerPage', selectedDimension));

    this.dispatchActionWithDi(diContainer, StartFetchDataForSelectedChartAction, {
      stateNamespace: 'dataExplorerPage'
    });
  }

  changeSelectedDimensionColorForSelectedChart(selectedDimension: SelectedDimension, color: string) {
    this.dispatchAction(
      new ChangeSelectedDimensionColorForSelectedChartAction('dataExplorerPage', selectedDimension, color)
    );
  }

  createController = () => ({
    addSelectedDimensionToSelectedChart: this.addSelectedDimensionToSelectedChart,
    removeSelectedDimensionFromSelectedChart: this.removeSelectedDimensionFromSelectedChart,
    changeSelectedDimensionColorForSelectedChart: this.changeSelectedDimensionColorForSelectedChart
  });
}
