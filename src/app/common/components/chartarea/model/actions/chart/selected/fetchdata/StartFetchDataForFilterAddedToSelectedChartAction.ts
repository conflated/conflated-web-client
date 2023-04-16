import _ from 'lodash';
import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForFilterAddedToSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const lastSelectedFilter = _.last(selectedChart.getFilters());

    if (selectedChart.chartData.getForFilter(lastSelectedFilter).length === 0) {
      return this.performAction(
        new StartFetchDataForSelectedChartAction({
          chartDataService: this.chartDataService,
          stateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForFilterAddedToSelectedChartAction;
