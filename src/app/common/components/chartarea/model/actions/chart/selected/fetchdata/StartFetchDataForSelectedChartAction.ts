import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/data/ColumnNameToValuesMap';
import FinishFetchChartDataAction from '../../fetchdata/FinishFetchChartDataAction';
import ChartAreaStateFactory from '../../../../state/utils/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForSelectedChartAction extends AbstractChartAreaAction {
  readonly chartDataService: ChartDataService;

  constructor({ chartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    this.chartDataService
      .fetchChartData(
        selectedChart.dataSource,
        selectedChart.getColumns(),
        selectedChart.getFilters(),
        selectedChart.getSorts()
      )
      .then((columnNameToValuesMap: ColumnNameToValuesMap) => {
        this.dispatch(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, selectedChart.id));
      });

    selectedChart.isFetchingData = true;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchDataForSelectedChartAction;
