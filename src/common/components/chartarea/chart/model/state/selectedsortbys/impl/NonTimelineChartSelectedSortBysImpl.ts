import type { Measure } from '../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import BasicChartSelectedSortBysImpl from './BasicChartSelectedSortBysImpl';

export default class NonTimelineChartSelectedSortBysImpl extends BasicChartSelectedSortBysImpl {
  updateSelectedSortBysWhenAddingSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.selectedSortBys.length === 0 && selectedMeasures.length === 0) {
      this.addSelectedSortBy(measureOrDimension, 'measure', 'DESC', 'measure');
    } else if (this.selectedSortBys.length === 1 && this.selectedSortBys[0].defaultType === 'measure') {
      this.selectedSortBys = [];
      this.addSelectedSortByAverageOfMeasures(selectedMeasures);
    }
  }

  updateSelectedSortBysWhenAddingSelectedDimension(): void {
    // Intentionally no operation
  }
}
