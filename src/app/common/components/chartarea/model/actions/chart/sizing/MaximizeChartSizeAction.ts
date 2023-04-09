import Utils from '../../../../../../utils/Utils';
import AbstractChartAreaAction from '../../AbstractChartAreaAction';
import { ChartAreaStateNamespace } from '../../../state/types/ChartAreaStateNamespace';
import { Chart } from '../../../../chart/model/state/Chart';
import { ChartAreaState } from '../../../state/ChartAreaState';

export default class MaximizeChartSizeAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaStateNamespace, private readonly chart: Chart) {
    super(stateNamespace);
    this.chart = chart;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { layout } = currentState;

    const chartGridItem = Utils.findElem(layout, 'i', this.chart.id);

    if (chartGridItem) {
      const newChartGridItem = {
        ...chartGridItem,
        h: 12,
        w: 12
      };

      return {
        ...currentState,
        layout: [newChartGridItem],
        maximizedChart: this.chart,
        previousLayout: layout
      };
    }

    return currentState;
  }
}
