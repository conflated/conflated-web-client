import type { SelectedMeasure } from '../../../../../../selectedmeasure/SelectedMeasure';
import type { Dimension } from '../../../../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { DimensionVisualizationType } from '../../../../../../selecteddimension/types/DimensionVisualizationType';
import type { Measure } from '../../../../../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import MixedChartImpl from '../MixedChartImpl';

export default class LineOrAreaChartImpl extends MixedChartImpl {
  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    if (this.hasTimestampXAxis()) {
      this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedDimension(dimension, visualizationType, this);
    }

    super.addSelectedDimension(dimension, visualizationType);
  }

  getStrokeWidth(): number | number[] {
    if (this.selectedDimensions.length === 1) {
      return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
        visualizationType === 'column' ? 0 : 3
      );
    } else if (
      this.selectedMeasures.length === 1 &&
      this.selectedDimensions.length === 2 &&
      this.selectedMeasures[0].visualizationType === 'column'
    ) {
      return 0;
    }

    return 3.0;
  }

  hasContinuousXAxis(): boolean {
    return true;
  }

  shouldShowStroke(): boolean {
    return true;
  }
}
