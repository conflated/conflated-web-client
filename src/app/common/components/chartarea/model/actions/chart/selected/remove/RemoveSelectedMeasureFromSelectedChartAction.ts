import type { SelectedMeasure } from '../../../../../chart/model/state/selectedmeasure/SelectedMeasure';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from '../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../di/diContainer';
import StartFetchDimensionsAction from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/actions/StartFetchDimensionsAction';

export default class RemoveSelectedMeasureFromSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedMeasure: SelectedMeasure) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: 'dataExplorerPage'
    });

    const { selectedChart } = currentState;
    selectedChart.removeSelectedMeasure(this.selectedMeasure);
    this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart });
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
