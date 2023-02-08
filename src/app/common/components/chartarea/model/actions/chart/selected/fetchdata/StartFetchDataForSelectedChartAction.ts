import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import AbstractChartAreaDispatchingAction from '../../../AbstractChartAreaDispatchingAction';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import FinishFetchChartDataAction from '../../fetchdata/FinishFetchChartDataAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForSelectedChartAction extends AbstractChartAreaDispatchingAction {
  readonly chartDataService: ChartDataService;

  constructor({ chartDataService, dispatchAction, stateNamespace }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
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
        this.dispatchAction(
          new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, selectedChart.id)
        );
      });

    selectedChart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchDataForSelectedChartAction;
