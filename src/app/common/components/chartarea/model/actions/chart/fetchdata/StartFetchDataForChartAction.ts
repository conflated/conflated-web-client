import { Inject } from 'noicejs';
import type { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import FinishFetchChartDataAction from './FinishFetchChartDataAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/data/ColumnNameToValuesMap';
import { ChartDataService } from '../../../../chart/model/service/ChartDataService';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
  chart: Chart;
};

@Inject('chartDataService')
class StartFetchDataForChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  private readonly chart: Chart;

  constructor({ chartDataService, stateNamespace, chart }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.chartDataService
      .fetchChartData(this.chart.dataSource, this.chart.getColumns(), this.chart.getFilters(), this.chart.getSorts())
      .then((columnNameToValuesMap: ColumnNameToValuesMap) => {
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, this.chart.id));
      });

    this.chart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}

export default StartFetchDataForChartAction;
