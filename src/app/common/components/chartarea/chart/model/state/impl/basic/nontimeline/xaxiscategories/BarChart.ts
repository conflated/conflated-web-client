import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class BarChart extends AbstractXAxisCategoriesChart {
  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'column';
  }

  getSubtitleText(): string {
    if (this.selectedDimensions.length === 0 && this.selectedMeasures.length > 0) {
      return 'All';
    }

    return super.getSubtitleText();
  }

  isXAxisScrollable(): boolean {
    return true;
  }

  supportsAllDimension(): boolean {
    return true;
  }
}
