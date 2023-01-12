import type { Measure } from '../../../../../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { Dimension } from '../../../../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { AggregationFunction } from '../../../../../../selectedmeasure/types/AggregationFunction';
import type { SelectedMeasure } from '../../../../../../selectedmeasure/SelectedMeasure';
import PieOrDonutChartImpl from '../PieOrDonutChartImpl';

export default class PieChartImpl extends PieOrDonutChartImpl {
  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    this.selectedMeasures = [];
    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    return super.getConvertSelectedMeasures();
  }
}
