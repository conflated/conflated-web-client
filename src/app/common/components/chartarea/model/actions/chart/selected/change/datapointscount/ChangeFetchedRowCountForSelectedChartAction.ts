import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import Utils from '../../../../../../../../utils/Utils';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import StartFetchDataForSelectedChartAction from '../../fetchdata/StartFetchDataForSelectedChartAction';
import diContainer from '../../../../../../../../../../di/diContainer';

export default class ChangeFetchedRowCountForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly fetchedRowCountStr: string) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    this.dispatchWithDi(StartFetchDataForSelectedChartAction, diContainer, {});
    const { selectedChart } = currentState;
    selectedChart.fetchedRowCount = Utils.parseIntOrDefault(this.fetchedRowCountStr, 0);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
