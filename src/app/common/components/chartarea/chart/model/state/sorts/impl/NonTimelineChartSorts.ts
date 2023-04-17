import type { Measure } from '../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import AbstractBasicChartSorts from './AbstractBasicChartSorts';

export default class NonTimelineChartSorts extends AbstractBasicChartSorts {
  override updateSortsWhenAddingSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    selectedMeasures: SelectedMeasure[]
  ) {
    if (this.sorts.length === 0 && selectedMeasures.length === 0) {
      this.addSort(measureOrDimension, 'measure', 'DESC', 'measure');
    } else if (this.sorts.length === 1 && this.sorts[0].defaultType === 'measure') {
      this.sorts = [];
      this.addSortByAverageOfMeasures(selectedMeasures);
    }
  }

  override updateSortsWhenAddingSelectedDimension(): void {
    // Intentionally no operation
  }
}
