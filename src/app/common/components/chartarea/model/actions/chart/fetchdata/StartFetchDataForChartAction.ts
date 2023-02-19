import { Inject } from 'noicejs';
import type { ChartAreaPageStateNamespace } from '../../../state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import FinishFetchChartDataAction from './FinishFetchChartDataAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import { ChartDataService } from '../../../../chart/model/service/ChartDataService';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  pageStateNamespace: ChartAreaPageStateNamespace;
  chart: Chart;
};

@Inject('chartDataService')
class StartFetchDataForChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  private readonly chart: Chart;

  constructor({ chartDataService, pageStateNamespace, chart }: ConstructorArgs) {
    super(pageStateNamespace);
    this.chartDataService = chartDataService;
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chartDataService
      .fetchChartData(
        this.chart.dataSource,
        this.chart.getColumns(),
        this.chart.getSelectedFilters(),
        this.chart.getSelectedSortBys()
      )
      .then((columnNameToValuesMap: ColumnNameToValuesMap) => {
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, this.chart.id));
      });

    this.chart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}

export default StartFetchDataForChartAction;
