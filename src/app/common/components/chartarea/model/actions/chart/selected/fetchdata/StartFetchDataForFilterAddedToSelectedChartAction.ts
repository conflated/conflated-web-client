import _ from 'lodash';
import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaPageStateNamespace } from '../../../../state/types/ChartAreaPageStateNamespace';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  pageStateNamespace: ChartAreaPageStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForFilterAddedToSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, pageStateNamespace }: ConstructorArgs) {
    super(pageStateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const lastSelectedFilter = _.last(selectedChart.getSelectedFilters());

    if (selectedChart.chartData.getForSelectedFilter(lastSelectedFilter).length === 0) {
      return this.performAction(
        new StartFetchDataForSelectedChartAction({
          chartDataService: this.chartDataService,
          pageStateNamespace: this.stateNamespace
        }),
        currentState
      );
    }

    return currentState;
  }
}

export default StartFetchDataForFilterAddedToSelectedChartAction;
