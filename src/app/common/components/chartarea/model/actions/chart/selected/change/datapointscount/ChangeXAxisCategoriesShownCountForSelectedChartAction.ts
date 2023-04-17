import AbstractChartAreaAction from '../../../../AbstractChartAreaAction';
import type { ChartAreaState } from '../../../../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../../../../state/types/ChartAreaStateNamespace';
import Utils from '../../../../../../../../utils/Utils';
import ChartAreaStateFactory from '../../../../../state/ChartAreaStateFactory';

export default class ChangeXAxisCategoriesShownCountForSelectedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly xAxisCategoriesShownCountStr: string) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    selectedChart.xAxisCategoriesShownCount = Utils.parseIntOrDefault(this.xAxisCategoriesShownCountStr, 10);
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}
