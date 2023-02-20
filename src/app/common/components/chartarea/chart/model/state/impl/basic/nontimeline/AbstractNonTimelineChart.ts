import type { Measure } from '../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import AbstractBasicChart from '../AbstractBasicChart';

export default abstract class AbstractNonTimelineChart extends AbstractBasicChart {
  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedMeasure(measureOrDimension, this.selectedMeasures);
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }
}
