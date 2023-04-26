import { Inject } from 'noicejs';
import _ from 'lodash';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartDataService } from '../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/data/ColumnNameToValuesMap';
import FinishFetchChartDataAction from './FinishFetchChartDataAction';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import ChartFactory from '../../../../chart/model/state/ChartFactory';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
  chart: Chart;
};

@Inject('chartDataService')
class StartFetchDataForOtherChartsAction extends AbstractChartAreaAction {
  readonly chartDataService: ChartDataService;

  readonly chart: Chart;

  constructor({ chartDataService, stateNamespace, chart }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    _.without(charts, this.chart).forEach((chart: Chart) =>
      this.chartDataService
        .fetchChartData(chart.dataSource, chart.getColumns(), chart.getFilters(), chart.getSorts())
        .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
          this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, chart.id))
        )
    );

    return {
      ...currentState,
      charts: [
        ...(this.chart ? [this.chart] : []),
        ..._.without(charts, this.chart).map((chart) => {
          chart.setIsFetchingData(true);
          return ChartFactory.createChart(chart.getConfiguration());
        })
      ]
    };
  }
}

export default StartFetchDataForOtherChartsAction;
