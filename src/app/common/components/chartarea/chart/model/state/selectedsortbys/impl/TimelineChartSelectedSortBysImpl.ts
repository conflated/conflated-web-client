import BasicChartSelectedSortBysImpl from './BasicChartSelectedSortBysImpl';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';

export default class TimelineChartSelectedSortBysImpl extends BasicChartSelectedSortBysImpl {
  updateSelectedSortBysWhenAddingSelectedDimension(measureOrDimension: Dimension | Measure) {
    this.selectedSortBys = [];
    this.addSelectedSortBy(measureOrDimension, 'dimension', 'ASC', 'x-axis categories');
  }

  updateSelectedSortBysWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
