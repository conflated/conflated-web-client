import type { ChartAreaState } from '../../../../state/ChartAreaState';
import type { Chart } from '../../../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import ChartFactory from '../../../../../chart/model/state/ChartFactory';

export default class ChangeFilterExpressionForChartFiltersAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly filteringChart: Chart,
    private readonly filterExpression: string
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    /* if (this.filter.dataScopeType === 'all') {
      this.dispatchWithDi(StartFetchDataForChartAction, diContainer, {
        chart: this.chart,
        stateNamespace: this.stateNamespace
      });
    } */

    const { charts } = currentState;

    return {
      ...currentState,
      charts: charts.map((chart) => {
        const chartFilterForThisFilteringChart = chart.filters
          .getFilters()
          .find((filter) => filter.filteringChart === this.filteringChart);

        if (chartFilterForThisFilteringChart) {
          chart.filters.changeFilterExpression(chartFilterForThisFilteringChart, this.filterExpression);
          return ChartFactory.createChart(chart.getConfiguration());
        } else {
          return chart;
        }
      })
    };
  }
}
