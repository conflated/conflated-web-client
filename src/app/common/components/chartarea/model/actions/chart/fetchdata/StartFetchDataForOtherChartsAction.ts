import { Inject } from 'noicejs';
import _ from 'lodash';
import type { DispatchAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../../../state/ChartAreaState';
import type { Chart } from '../../../../chart/model/state/Chart';
import type { ChartDataService } from '../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../chart/model/state/chartdata/ColumnNameToValuesMap';
import FinishFetchChartDataAction from './FinishFetchChartDataAction';
import type { ChartAreaPageStateNamespace } from '../../../state/namespace/ChartAreaPageStateNamespace';
import AbstractChartAreaDispatchingAction from '../../AbstractChartAreaDispatchingAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaPageStateNamespace;
  dispatchAction: DispatchAction;
  chart: Chart;
};

@Inject('chartDataService')
class StartFetchDataForOtherChartsAction extends AbstractChartAreaDispatchingAction {
  readonly chartDataService: ChartDataService;

  readonly chart: Chart;

  constructor({ chartDataService, stateNamespace, dispatchAction, chart }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { charts } = currentState;

    _.without(charts, this.chart).forEach((chart: Chart) =>
      this.chartDataService
        .fetchChartData(chart.dataSource, chart.getColumns(), chart.getSelectedFilters(), chart.getSelectedSortBys())
        .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
          this.dispatchAction(new FinishFetchChartDataAction(this.stateNamespace, columnNameToValuesMap, chart.id))
        )
    );

    const newState = {
      ...currentState,
      charts: [
        ...(this.chart ? [this.chart] : []),
        ..._.without(charts, this.chart).map((chart: Chart): Chart => {
          chart.setIsFetchingChartData(true);
          return chart;
        })
      ]
    };

    return newState;
  }
}

export default StartFetchDataForOtherChartsAction;
