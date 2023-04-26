import AbstractChartAreaAction from '../AbstractChartAreaAction';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { Chart } from '../../../chart/model/state/Chart';
import type { ChartAreaStateNamespace } from '../../state/types/ChartAreaStateNamespace';
import { nullChart } from '../../state/createChartAreaStateReducer';
import { GridItem } from '../../state/types/GridItem';
import scrollingLayout from '../../../../../../page/dataexplorer/pane/left/selector/layout/model/state/layouts/scrollingLayout';

export default class ChangeChartAreaLayoutAndChartsAction extends AbstractChartAreaAction {
  constructor(
    stateNamespace: ChartAreaStateNamespace,
    private readonly layout: GridItem[],
    private readonly charts: Chart[]
  ) {
    super(stateNamespace);
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    return {
      ...currentState,
      layout: this.layout,
      charts: this.charts,
      selectedChart: nullChart,
      isScrollingLayout: this.layout === scrollingLayout
    };
  }
}
