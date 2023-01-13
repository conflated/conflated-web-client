import AbstractChartAreaAction from '../AbstractChartAreaAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from './ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import Constants from '../../../../../Constants';
import type { ChartAreaState } from '../../state/ChartAreaState';
import type { GridItem } from '../../state/types/GridItem';
import type { ChartAreaPageStateNamespace } from '../../state/namespace/ChartAreaPageStateNamespace';
import type { DragType } from '../../../../../../header/model/state/types/DragType';
import Utils from '../../../../../model/state/utils/Utils';

export default class EnterChartAreaWithDraggedChartAction extends AbstractChartAreaAction {
  constructor(stateNamespace: ChartAreaPageStateNamespace, private readonly dragType: DragType) {
    super(stateNamespace);
  }

  performActionAndReturnNewState(currentState: ChartAreaState): ChartAreaState {
    const { layout } = currentState;

    const chartPlaceholder = Utils.findElem(layout, 'i', Constants.CHART_PLACEHOLDER);

    if (this.dragType === 'chartType' && !chartPlaceholder) {
      const nonFirstRowCharts = layout.filter(({ y }: GridItem) => y !== 0);
      const firstRowCharts = layout.filter(({ y }: GridItem) => y === 0);

      if (firstRowCharts.length > 0) {
        const chartPlaceholderGridItem = {
          i: Constants.CHART_PLACEHOLDER,
          x: 0,
          y: 0,
          w: Constants.GRID_COLUMN_COUNT / (firstRowCharts.length + 1),
          h: firstRowCharts[0].h,
          isDraggable: false,
          isResizable: false
        };

        const modifiedFirstRowCharts = firstRowCharts
          .sort((chart1: GridItem, chart2: GridItem) => chart1.x - chart2.x)
          .map((firstRowChart: GridItem, index: number) => ({
            ...firstRowChart,
            w: Constants.GRID_COLUMN_COUNT / (firstRowCharts.length + 1),
            x: ((index + 1) * Constants.GRID_COLUMN_COUNT) / (firstRowCharts.length + 1)
          }));

        const newLayout = [...nonFirstRowCharts, ...modifiedFirstRowCharts, chartPlaceholderGridItem];

        return this.performAction(
          new ChangeChartAreaLayoutAndStorePreviousLayoutAction(this.stateNamespace, newLayout),
          currentState
        );
      }
    }

    return currentState;
  }
}
