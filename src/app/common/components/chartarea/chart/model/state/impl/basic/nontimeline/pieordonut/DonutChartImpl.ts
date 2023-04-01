import type { Measure } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { DimensionVisualizationType } from '../../../../selecteddimension/types/DimensionVisualizationType';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import PieOrDonutChartImpl from './PieOrDonutChartImpl';

export default class DonutChartImpl extends PieOrDonutChartImpl {
  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    super.addSelectedDimension(dimension, visualizationType);
  }

  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    if (this.selectedDimensions.length >= 1) {
      this.selectedMeasures = [];
    }

    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  override getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  override getApexChartType(): string {
    if (
      ((this.selectedMeasures.length === 1 && this.selectedMeasures[0].measure.unit === 'percent') ||
        this.selectedMeasures.length > 1) &&
      this.selectedDimensions.length === 0
    ) {
      return 'radialBar';
    }

    return super.getApexChartType();
  }

  override getTitleText(): string | null {
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
