import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import Utils from '../../../../../../utils/Utils';

export default class FinishFetchChartDataAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly columnNameToValuesMap: ColumnNameToValuesMap,
    private readonly chartId: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const chart = Utils.findElem(currentState.charts, 'id', this.chartId);

    if (chart) {
      chart.setChartData(this.columnNameToValuesMap);
      return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, chart);
    }

    return currentState;
  }
}
