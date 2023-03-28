import BasicChartSelectedSortBysImpl from './BasicChartSelectedSortBysImpl';
import type { Dimension } from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';

export default class TimelineChartSelectedSortBysImpl extends BasicChartSelectedSortBysImpl {
  override updateSelectedSortBysWhenAddingSelectedDimension(measureOrDimension: Dimension | Measure) {
    this.selectedSortBys = [];
    this.addSelectedSortBy(measureOrDimension, 'dimension', 'ASC', 'x-axis categories');
  }

  override updateSelectedSortBysWhenAddingSelectedMeasure(): void {
    // Intentionally no operation
  }
}
