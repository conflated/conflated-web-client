/* eslint-disable @typescript-eslint/no-explicit-any */
import XAxisChartImpl from '../XAxisChartImpl';

export default class RadarChartImpl extends XAxisChartImpl {
  getFillOpacity(): number {
    return 0.4;
  }

  getLabels(): any[] | null | undefined {
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

  getStrokeWidth(): number {
    return 3.0;
  }
}
