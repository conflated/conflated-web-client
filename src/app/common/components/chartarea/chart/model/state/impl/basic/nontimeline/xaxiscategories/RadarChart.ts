/* eslint-disable @typescript-eslint/no-explicit-any */

import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';

export default class RadarChart extends AbstractXAxisCategoriesChart {
  override handleChartJsClick(): void {
    throw new Error('Method not implemented.');
  }

  override getFillOpacity(): number {
    return 0.4;
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
}
