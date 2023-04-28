/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import { DataSeries } from '../../../../types/DataSeries';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';

export default class BoxPlotChart extends AbstractXAxisCategoriesChart {
  override getValidAggregationFunction(): AggregationFunction {
    return 'NONE';
  }

  override getStrokeWidth(): number | number[] {
    return 1;
  }

  override shouldShowStroke(): boolean {
    return true;
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'boxPlot';
  }

  override supportsTooltipSelectedDimension(): boolean {
    return false;
  }

  override getSupportedAggregationFunctions(): AggregationFunction[] {
    return ['NONE'];
  }

  override getApexDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[] {
    if (this.selectedMeasures.length >= 1 && this.hasSelectedDimensionOfType('Legend')) {
      const xAxisValues = this.getDataForSelectedDimensionOfType('X-axis categories');
      const measureValues = this.data.getForSelectedMeasure(this.selectedMeasures[0]);
      const legendValues = this.getDataForSelectedDimensionOfType('Legend');

      const dataSeries: DataSeries = {
        name: 'boxPlot',
        data: [],
        type: 'boxPlot'
      };

      if (legendValues.length > 0) {
        legendValues.forEach((legendValue: any, valueIndex: number) => {
          if (shownXAxisCategories.includes(xAxisValues[valueIndex])) {
            const foundDataPoint = dataSeries.data.find(({ x }): any => x === xAxisValues[valueIndex]);
            if (foundDataPoint == null) {
              dataSeries.data.push({
                x: xAxisValues[valueIndex],
                y: [measureValues[valueIndex]]
              });
            } else {
              foundDataPoint.y.push(measureValues[valueIndex]);
            }
          }
        });

        dataSeries.data.forEach((dataPoint) => dataPoint.y.sort());

        return [dataSeries];
      }
    }

    return this.getEmptyDataSeries();
  }
}
