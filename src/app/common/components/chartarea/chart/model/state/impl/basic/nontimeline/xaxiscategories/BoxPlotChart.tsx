/* eslint-disable @typescript-eslint/no-explicit-any */
import percentile from 'percentile';
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import { DataSeries } from '../../../../types/DataSeries';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import MeasureDropZoneListItemViewFactory from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

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

        dataSeries.data.forEach((dataPoint) => {
          // eslint-disable-next-line no-param-reassign
          dataPoint.y = [
            Math.min(...dataPoint.y),
            percentile(25, dataPoint.y),
            percentile(50, dataPoint.y),
            percentile(75, dataPoint.y),
            Math.max(...dataPoint.y)
          ];
        });

        const scatterDataSeries: DataSeries = {
          name: 'scatter',
          data: [],
          type: 'scatter'
        };

        legendValues.forEach((legendValue: any, valueIndex: number) => {
          if (shownXAxisCategories.includes(xAxisValues[valueIndex])) {
            scatterDataSeries.data.push({
              x: xAxisValues[valueIndex],
              y: [measureValues[valueIndex]]
            });
          }
        });

        return [dataSeries];
      }
    }

    return this.getEmptyDataSeries();
  }

  override getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    return [measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('1', 'boxPlot', 'measure')];
  }
}
