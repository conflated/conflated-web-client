import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import AbstractBasicChartSorts from './AbstractBasicChartSorts';

export default class NonTimelineChartSorts extends AbstractBasicChartSorts {
  override updateSelectedSortBysWhenAddingSelectedMeasure(
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

  override updateSelectedSortBysWhenAddingSelectedDimension(): void {
    // Intentionally no operation
  }
}
