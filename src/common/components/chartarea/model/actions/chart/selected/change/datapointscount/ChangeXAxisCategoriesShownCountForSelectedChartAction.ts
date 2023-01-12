import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaPageStateNamespace } from '../../../../../state/namespace/ChartAreaPageStateNamespace';
import Utils from '../../../../../../../../model/state/utils/Utils';
import ChartAreaStateUpdater from '../../../../../state/utils/ChartAreaStateUpdater';

export default class ChangeXAxisCategoriesShownCountForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly xAxisCategoriesShownCountStr: string) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.xAxisCategoriesShownCount = Utils.parseIntOrDefault(this.xAxisCategoriesShownCountStr, 10);
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}
