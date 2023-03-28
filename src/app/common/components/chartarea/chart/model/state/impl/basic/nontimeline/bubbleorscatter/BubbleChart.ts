/* eslint-disable @typescript-eslint/no-explicit-any */
import type { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import ScatterChart from './ScatterChart';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import type { DataSeries } from '../../../../types/DataSeries';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';

export default class BubbleChart extends ScatterChart {
  getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 3);
    return super.getConvertSelectedMeasures();
  }

  getApexChartDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];

    if (this.hasData()) {
      const [xAxisData, yAxisData, radiusData, legendData] = this.chartData.getBubbleChartData(
        this.selectedMeasures,
        this.selectedDimensions
      );

      if (legendData.length > 0) {
        legendData.forEach((value: any, index: number) => {
          const foundDataSeries = dataSeries.find(({ name }: DataSeries) => name === value);

          if (foundDataSeries == null) {
            dataSeries.push({
              name: value,
              data: [[xAxisData[index], yAxisData[index], radiusData[index]]]
            });
          } else {
            foundDataSeries.data.push([xAxisData[index], yAxisData[index], radiusData[index]]);
          }
        });
      } else {
        const data = xAxisData.map((xAxisValue: any, index: number) => [
          xAxisValue,
          yAxisData[index],
          radiusData[index]
        ]);

        dataSeries.push({
          name: '',
          data
        });

        dataSeries.push({
          name: '',
          data: []
        });
      }
    } else {
      dataSeries.push({
        name: '',
        data: [0, 0, 0]
      });
    }

    return dataSeries;
  }

  getChartConfigHintTitle(): string {
    if (this.selectedMeasures.length === 1) {
      return 'Add two more measures';
    } else if (this.selectedMeasures.length === 2) {
      return 'Add one more measure';
    }

    return super.getChartConfigHintTitle();
  }

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    const dimensionDropZoneListItemViews = super.getDimensionDropZoneListItemViews(
      dimensionDropZoneListItemViewFactory
    );

    if (dimensionDropZoneListItemViews.length === 0) {
      if (this.hasSelectedDimensionOfType('Legend')) {
        return [dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Drilldown')];
      } else {
        return [dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Legend')];
      }
    }

    return dimensionDropZoneListItemViews;
  }

  getNextMeasureVisualizationType(
    measureVisualizationType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType {
    return selectedMeasureIndex === 2 || this.selectedMeasures.length === 2
      ? 'radius'
      : super.getNextMeasureVisualizationType(measureVisualizationType, selectedMeasureIndex);
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['x-axis', 'y-axis', 'radius']);
  }

  hasData(): boolean {
    const [xAxisData, yAxisData, radiusData] = this.chartData.getBubbleChartData(
      this.selectedMeasures,
      this.selectedDimensions
    );

    return (
      this.selectedDimensions.length > 0 &&
      xAxisData.length > 0 &&
      yAxisData.length > 0 &&
      radiusData.length > 0 &&
      xAxisData.length === yAxisData.length &&
      yAxisData.length === radiusData.length
    );
  }
}
