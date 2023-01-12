import BasicChartSelectedSortBysImpl from './BasicChartSelectedSortBysImpl';
import type { Dimension } from '../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';

export default class TimelineChartSelectedSortBysImpl extends BasicChartSelectedSortBysImpl {
  updateSelectedSortBysWhenAddingSelectedDimension(measureOrDimension: Dimension | Measure) {
    this.selectedSortBys = [];
    this.addSelectedSortBy(measureOrDimension, 'dimension', 'ASC', 'x-axis categories');
  }

  updateSelectedSortBysWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
