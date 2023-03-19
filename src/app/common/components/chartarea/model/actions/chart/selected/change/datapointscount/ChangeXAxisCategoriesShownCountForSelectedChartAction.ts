import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import Utils from '../../../../../../../../utils/Utils';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';

export default class ChangeXAxisCategoriesShownCountForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly xAxisCategoriesShownCountStr: string) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.xAxisCategoriesShownCount = Utils.parseIntOrDefault(this.xAxisCategoriesShownCountStr, 10);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
