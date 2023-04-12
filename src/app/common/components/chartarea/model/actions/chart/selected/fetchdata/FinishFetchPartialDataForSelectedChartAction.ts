import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class FinishFetchPartialDataForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chartData: ColumnNameToValuesMap) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.isFetchingChartData = false;
    selectedChart.mergeChartData(this.chartData);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
