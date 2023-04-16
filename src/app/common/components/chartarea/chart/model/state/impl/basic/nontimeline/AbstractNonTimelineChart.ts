import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import AbstractBasicChart from '../AbstractBasicChart';
import { ChartConfiguration } from '../../../ChartConfiguration';
import NonTimelineChartSorts from '../../../sorts/impl/NonTimelineChartSorts';

export default abstract class AbstractNonTimelineChart extends AbstractBasicChart {
  constructor(chartConfiguration?: ChartConfiguration) {
    super(chartConfiguration);
    if (chartConfiguration) {
      this.sorts = new NonTimelineChartSorts(chartConfiguration.selectedSortBys);
    }
  }

  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.sorts.updateSelectedSortBysWhenAddingSelectedMeasure(measureOrDimension, this.selectedMeasures);
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }
}
