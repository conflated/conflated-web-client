import AbstractBasicChartSorts from './AbstractBasicChartSorts';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';

export default class TimelineChartSorts extends AbstractBasicChartSorts {
  override updateSelectedSortBysWhenAddingSelectedDimension(measureOrDimension: Dimension | Measure) {
    this.selectedSortBys = [];
    this.addSelectedSortBy(measureOrDimension, 'dimension', 'ASC', 'x-axis categories');
  }

  override updateSelectedSortBysWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
