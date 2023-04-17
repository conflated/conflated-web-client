import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import ChartAreaStateFactory from '../../../state/utils/ChartAreaStateFactory';
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
      chart.setData(this.columnNameToValuesMap);
      return ChartAreaStateFactory.createNewStateForChangedChart(currentState, chart);
    }

    return currentState;
  }
}
