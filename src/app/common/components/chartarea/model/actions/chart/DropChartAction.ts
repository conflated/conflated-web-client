import AbstractChartAreaAction from '../AbstractChartAreaAction';
import AddChartAction from './AddChartAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import Constants from '../../../../../Constants';
import type { ChartType } from '../../../chart/model/state/types/ChartType';
import Utils from '../../../../../utils/Utils';
import ChartFactory from '../../../chart/model/state/ChartFactory';
import ChangeChartAreaLayoutAction from '../layout/ChangeChartAreaLayoutAction';

export default class DropChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chartType: ChartType) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { layout } = currentState;
    const chartPlaceholder = Utils.findElem(layout, 'i', Constants.CHART_PLACEHOLDER);

    if (chartPlaceholder) {
      const newChartGridItem = {
        ...chartPlaceholder,
        i: layout.length.toString(),
        isDraggable: true,
        isResizable: true
      };

      const newChart = ChartFactory.createChart();
      newChart.id = layout.length.toString();
      newChart.chartType = this.chartType;

      const layoutWithoutChartPlaceholder = Utils.without(layout, 'i', Constants.CHART_PLACEHOLDER);
      const newLayout = [...layoutWithoutChartPlaceholder, newChartGridItem];

      const newState = this.performAction(
        new ChangeChartAreaLayoutAction(this.stateNamespace, newLayout),
        currentState
      );

      return this.performAction(new AddChartAction(this.stateNamespace, newChart, newLayout), newState);
    }

    return currentState;
  }
}
