import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import ChartFactory from '../../../../chart/model/state/ChartFactory';

export default class RemoveSelectionFilterFromNotSelectedChartsAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly selectedChart: Chart | null | undefined) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    return {
      ...currentState,
      charts: charts.map((chart) => {
        if (chart !== this.selectedChart && this.selectedChart) {
          chart.filters.removeSelectionFilter(this.selectedChart.id);
          return ChartFactory.createChart(chart.getChartConfiguration());
        }

        return chart;
      })
    };
  }
}
