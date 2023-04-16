/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import type { DataSeries } from '../../../../types/DataSeries';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class HeatmapChart extends AbstractXAxisCategoriesChart {
  override getApexChartDataSeries(): DataSeries[] | any[] {
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

  override getEmptyDataSeries(): DataSeries[] {
    return [
      {
        name: '',
        data: [0]
      }
    ];
  }

  override getColors(): string[] {
    return [this.selectedMeasures[0]?.visualizationColor ?? super.getAllColors()[0]];
  }

  override hasFollowCursorTooltip(): boolean {
    return true;
  }

  override supportsLegend(): boolean {
    return false;
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'area';
  }
}
