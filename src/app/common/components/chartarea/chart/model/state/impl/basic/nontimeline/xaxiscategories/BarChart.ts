import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class BarChart extends AbstractXAxisCategoriesChart {
  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'column';
  }

  override getSubtitleText(): string {
    if (this.selectedDimensions.length === 0 && this.selectedMeasures.length > 0) {
      return 'All';
    }

    return super.getSubtitleText();
  }

  override isXAxisScrollable(): boolean {
    return this.selectedDimensions.length > 0 && this.selectedDimensions[0].dimension.name !== 'All';
  }

  override supportsAllDimension(): boolean {
    return true;
  }
}
