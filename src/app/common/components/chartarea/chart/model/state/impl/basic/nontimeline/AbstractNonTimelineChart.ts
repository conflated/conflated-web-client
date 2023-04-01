import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import AbstractBasicChart from '../AbstractBasicChart';

export default abstract class AbstractNonTimelineChart extends AbstractBasicChart {
  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedMeasure(measureOrDimension, this.selectedMeasures);
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }
}
