import type { Measure } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { DimensionVisualizationType } from '../../../../selecteddimension/DimensionVisualizationType';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import PieOrDonutChartImpl from './PieOrDonutChartImpl';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class DonutChartImpl extends PieOrDonutChartImpl {
  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    super.addSelectedDimension(dimension, visualizationType);
  }

  override addSelectedMeasure(
    measureOrDimension: Measure | Dimension,
    aggregationFunction: AggregationFunction,
    measureVisalizationType: MeasureVisualizationType
  ) {
    if (this.selectedDimensions.length >= 1) {
      this.selectedMeasures = [];
    }

    super.addSelectedMeasure(measureOrDimension, aggregationFunction, measureVisalizationType);
  }

  override getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  override getApexType(): string {
    if (
      ((this.selectedMeasures.length === 1 && this.selectedMeasures[0].measure.unit === 'percent') ||
        this.selectedMeasures.length > 1) &&
      this.selectedDimensions.length === 0
    ) {
      return 'radialBar';
    }

    return super.getApexType();
  }

  override getTitleText(): string {
    if (
      this.selectedMeasures.length === 1 &&
      this.selectedMeasures[0].measure.unit === 'percent' &&
      this.selectedDimensions.length === 0
    ) {
      return '';
    }

    return super.getTitleText();
  }

  supportsMeasureVisualizationColor(): boolean {
    return this.selectedDimensions.length === 0;
  }

  override supportsAllDimension(): boolean {
    return true;
  }
}
