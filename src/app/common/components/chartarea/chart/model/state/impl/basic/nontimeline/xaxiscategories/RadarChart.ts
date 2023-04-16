/* eslint-disable @typescript-eslint/no-explicit-any */

import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import { FillType } from '../../../../types/FillType';

export default class RadarChart extends AbstractXAxisCategoriesChart {
  override getFillOpacity(): number {
    return 0.8;
  }

  override getLabels(): any[] | null | undefined {
    const xAxisCategoriesSelectedDimension = this.getSelectedDimensionOfType('X-axis categories');

    if (xAxisCategoriesSelectedDimension && this.selectedMeasures.length > 0) {
      const labelsData = this.chartData.getForSelectedDimension(
        this.currentDrillDownSelectedDimension ?? xAxisCategoriesSelectedDimension
      );

      if (labelsData && labelsData.length > 0) {
        return this.sliceOrFillXAxisData(labelsData);
      }
    }

    return undefined;
  }

  override getStrokeWidth(): number {
    return 3.0;
  }

  override getFillType(): FillType {
    return 'solid';
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }
}
