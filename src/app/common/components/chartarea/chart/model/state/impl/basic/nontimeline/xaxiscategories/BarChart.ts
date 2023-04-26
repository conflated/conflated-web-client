/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class BarChart extends AbstractXAxisCategoriesChart {
  override getColors(): string[] {
    const colors = super.getColors();

    return this.selectedMeasures.map((selectedMeasure, index) => {
      if (selectedMeasure.measure.unit === 'percent') {
        return (({ value }: any) => {
          if (value > 93) {
            return '#E23B3B';
          } else if (value > 88) {
            return '#F47F31';
          } else if (value > 84) {
            return '#F7B737';
          } else {
            return colors[index];
          }
        }) as any;
      } else {
        return colors[index];
      }
    });
  }

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
