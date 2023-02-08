import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

export default class FinishFetchPartialDataForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly chartData: ColumnNameToValuesMap) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.isFetchingChartData = false;
    selectedChart.mergeChartData(this.chartData);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
