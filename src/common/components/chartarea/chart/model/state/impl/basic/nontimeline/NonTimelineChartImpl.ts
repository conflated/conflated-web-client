import type { Measure } from '../../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import BasicChartImpl from '../BasicChartImpl';

export default class NonTimelineChartImpl extends BasicChartImpl {
  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.selectedSortBys.updateSelectedSortBysWhenAddingSelectedMeasure(measureOrDimension, this.selectedMeasures);
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }
}
