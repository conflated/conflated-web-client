import AbstractBasicChartSorts from './AbstractBasicChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';

export default class TimelineChartSorts extends AbstractBasicChartSorts {
  override updateSortsWhenAddingSelectedDimension(measureOrDimension: Dimension | Measure) {
    this.sorts = [];
    this.addSort(measureOrDimension, 'dimension', 'ASC', 'x-axis categories');
  }

  override updateSortsWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
