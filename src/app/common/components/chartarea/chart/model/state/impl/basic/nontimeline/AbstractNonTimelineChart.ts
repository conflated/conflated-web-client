import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import AbstractBasicChart from '../AbstractBasicChart';
import { ChartConfiguration } from '../../../ChartConfiguration';
import NonTimelineChartSorts from '../../../sorts/impl/NonTimelineChartSorts';
import { MeasureVisualizationType } from '../../../selectedmeasure/types/MeasureVisualizationType';

export default abstract class AbstractNonTimelineChart extends AbstractBasicChart {
  constructor(configuration?: ChartConfiguration) {
    super(configuration);
    if (configuration) {
      this.sorts = new NonTimelineChartSorts(configuration.sorts);
    }
  }

  override addSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction,
    measureVisualizationType: MeasureVisualizationType
  ) {
    this.sorts.updateSortsWhenAddingSelectedMeasure(measureOrDimension, this.selectedMeasures);
    super.addSelectedMeasure(measureOrDimension, aggregationFunction, measureVisualizationType);
  }
}
