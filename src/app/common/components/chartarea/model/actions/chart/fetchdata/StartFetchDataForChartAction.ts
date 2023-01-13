// @flow

import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import AbstractChartAreaDispatchingAction from '../../AbstractChartAreaDispatchingAction';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import FinishFetchChartDataAction from './FinishFetchChartDataAction';
import ChartAreaStateUpdater from '../../../state/utils/ChartAreaStateUpdater';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import { ChartDataService } from '../../../../chart/model/service/ChartDataService';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
  chart: Chart;
};

@Inject('chartDataService')
class StartFetchDataForChartAction extends AbstractChartAreaDispatchingAction {
  private readonly chartDataService: ChartDataService;

  private readonly chart: Chart;

  constructor({ chartDataService, dispatchAction, stateNamespace, chart }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
    this.chart = chart;
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    this.chartDataService
      .fetchChartData(
        this.chart.dataSource,
        this.chart.getColumns(),
        this.chart.getSelectedFilters(),
        this.chart.getSelectedSortBys()
      )
      .then((columnNameToValuesMap: ColumnNameToValuesMap) => {
        this.dispatchAction(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, this.chart.id));
      });

    this.chart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, this.chart);
  }
}

export default StartFetchDataForChartAction;
