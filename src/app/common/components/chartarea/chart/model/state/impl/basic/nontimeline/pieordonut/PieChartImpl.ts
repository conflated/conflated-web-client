import type { Measure } from '../../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import PieOrDonutChartImpl from './PieOrDonutChartImpl';

export default class PieChartImpl extends PieOrDonutChartImpl {
  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.selectedMeasures = [];
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  override getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    return super.getConvertSelectedMeasures();
  }
}