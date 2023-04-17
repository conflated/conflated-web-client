import type { SelectedDimension } from '../../../../../chart/model/state/selecteddimension/SelectedDimension';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateFactory from '../../../../state/utils/ChartAreaStateFactory';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';
import StartFetchMeasuresAction from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/actions/StartFetchMeasuresAction';
import StartFetchDimensionsAction from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/actions/StartFetchDimensionsAction';

export default class RemoveSelectedDimensionFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedDimension: SelectedDimension) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    selectedChart.removeSelectedDimension(this.selectedDimension);
    this.dispatchWithDi(StartFetchMeasuresAction, diContainer, { selectedChart });
    this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart });
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
