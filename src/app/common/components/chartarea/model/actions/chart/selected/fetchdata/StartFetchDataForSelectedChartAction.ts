import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/types/ChartAreaPageStateNamespace';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import FinishFetchChartDataAction from '../../fetchdata/FinishFetchChartDataAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  pageStateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForSelectedChartAction extends AbstractChartAreaAction {
  readonly chartDataService: ChartDataService;

  constructor({ chartDataService, pageStateNamespace }: ConstructorArgs) {
    super(pageStateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    this.chartDataService
      .fetchChartData(
        selectedChart.dataSource,
        selectedChart.getColumns(),
        selectedChart.getSelectedFilters(),
        selectedChart.getSelectedSortBys()
      )
      .then((columnNameToValuesMap: ColumnNameToValuesMap) => {
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, selectedChart.id));
      });

    selectedChart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchDataForSelectedChartAction;
