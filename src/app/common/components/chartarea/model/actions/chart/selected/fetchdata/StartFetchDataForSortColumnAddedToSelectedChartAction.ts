import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import StartFetchDataForSelectedChartAction from './StartFetchDataForSelectedChartAction';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';
import diContainer from '../../../../../../../../../di/diContainer';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('chartDataService')
class StartFetchDataForSortColumnAddedToSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {
      stateNamespace: this.stateNamespace
    });

    return currentState;
  }
}

export default StartFetchDataForSortColumnAddedToSelectedChartAction;
