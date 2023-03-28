/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import type { DataSeries } from '../../../../types/DataSeries';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';

export default class HeatmapChart extends AbstractXAxisCategoriesChart {
  handleChartJsClick(): void {
    throw new Error('Method not implemented.');
  }

  getApexChartDataSeries(): DataSeries[] | any[] {
    if (this.selectedMeasures.length > 0) {
      const dataSeries: DataSeries[] = [];
      const xAxisValues = this.getChartDataForSelectedDimensionOfType('X-axis categories');

      this.selectedMeasures.forEach((selectedMeasure: SelectedMeasure) => {
        let measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);

        measureValues = xAxisValues.map((xValue: string, valueIndex: number) => ({
          x: xValue,
          y: measureValues[valueIndex]
        }));

        measureValues = this.sliceOrFillXAxisData(measureValues);

        dataSeries.push({
          name: selectedMeasure.measure.name,
          data: measureValues.length > 0 ? measureValues : [0]
        });
      });

      return dataSeries;
    }

    return this.getEmptyDataSeries();
  }

  getEmptyDataSeries(): DataSeries[] {
    return [
      {
        name: '',
        data: [0]
      }
    ];
  }

  getColors(): string[] {
    return [this.selectedMeasures[0]?.visualizationColor ?? super.getAllColors()[0]];
  }

  hasFollowCursorTooltip(): boolean {
    return true;
  }

  supportsLegend(): boolean {
    return false;
  }
}
