import _ from 'lodash';
import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils2';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/namespace/ChartAreaPageStateNamespace';
import AbstractChartAreaDispatchingAction from '../../../AbstractChartAreaDispatchingAction';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  dispatchAction: DispatchAction;
  stateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForSortByAddedToSelectedChartAction extends AbstractChartAreaDispatchingAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, dispatchAction, stateNamespace }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const lastSelectedSortBy = _.last(selectedChart.getSelectedSortBys());

    if (
      selectedChart.getSelectedSortBys().length === 0 ||
      selectedChart.chartData.getForSelectedSortBy(lastSelectedSortBy).length === 0
    ) {
      return this.performAction(
        new StartFetchDataForSelectedChartAction({
          chartDataService: this.chartDataService,
          dispatchAction: this.dispatchAction,
          stateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForSortByAddedToSelectedChartAction;
