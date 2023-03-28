import type { Measure } from '../../../../../../../../../../../pages/dataexplorer/leftpane/measureselector/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/model/state/types/Dimension';
import type { AggregationFunction } from '../../../../../selectedmeasure/types/AggregationFunction';
import type { DimensionVisualizationType } from '../../../../../selecteddimension/types/DimensionVisualizationType';
import type { SelectedMeasure } from '../../../../../selectedmeasure/SelectedMeasure';
import PieOrDonutChartImpl from '../PieOrDonutChartImpl';
import { ChartAreaStateNamespace } from '../../../../../../../../model/state/types/ChartAreaStateNamespace';

export default class DonutChartImpl extends PieOrDonutChartImpl {
  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    super.addSelectedDimension(dimension, visualizationType);
  }

  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    if (this.selectedDimensions.length >= 1) {
      this.selectedMeasures = [];
    }

    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  getApexChartType(): string {
    if (
      ((this.selectedMeasures.length === 1 && this.selectedMeasures[0].measure.unit === 'percent') ||
        this.selectedMeasures.length > 1) &&
      this.selectedDimensions.length === 0
    ) {
      return 'radialBar';
    }

    return super.getApexChartType();
  }

  getTitleText(): string | null {
    if (
      this.selectedMeasures.length === 1 &&
      this.selectedMeasures[0].measure.unit === 'percent' &&
      this.selectedDimensions.length === 0
    ) {
      return null;
    }

    return super.getTitleText();
  }

  supportsMeasureVisualizationColor(): boolean {
    return this.selectedDimensions.length === 0;
  }
}
