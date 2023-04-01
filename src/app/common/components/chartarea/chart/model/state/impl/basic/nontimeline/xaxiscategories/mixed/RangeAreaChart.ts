import { DataSeries } from '../../../../../types/DataSeries';
import { MeasureVisualizationType } from '../../../../../selectedmeasure/types/MeasureVisualizationType';
import { SelectedMeasure } from '../../../../../selectedmeasure/SelectedMeasure';
import AbstractXAxisCategoriesChart from '../AbstractXAxisCategoriesChart';

export default class RangeAreaChart extends AbstractXAxisCategoriesChart {
  override getNextMeasureVisualizationType(
    selectedMeasureType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType {
    switch (selectedMeasureIndex ?? this.selectedMeasures.length) {
      case 0:
        return 'line';
      case 1:
        return 'lowerBound';
      default:
        return 'upperBound';
    }
  }

  override getSupportedMeasureVisualizationTypes(
    selectedMeasure: SelectedMeasure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    supportedMeasureVisualizationTypes?: MeasureVisualizationType[]
  ): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['line', 'lowerBound', 'upperBound']);
  }

  override getApexChartDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];

    if (this.hasData()) {
      const [yAxisData, lowerBoundData, upperBoundData, xAxisData, legendData] = this.chartData.getAreaRangeChartData(
        this.selectedMeasures,
        this.selectedDimensions
      );

      if (legendData.length > 0) {
        /* legendData.forEach((value, index) => {
          const foundDataSeries = dataSeries.find(({ name }: DataSeries) => name === value);

          if (foundDataSeries == null) {
            dataSeries.push({
              name: value,
              data: [[xAxisData[index], yAxisData[index]]]
            });
          } else {
            foundDataSeries.data.push([xAxisData[index], yAxisData[index]]);
          }
        }); */
      } else {
        const lineData = xAxisData.map((xAxisValue, index: number) => ({ x: xAxisValue, y: yAxisData[index] }));

        dataSeries.push({
          type: 'line',
          name: '',
          data: lineData
        });

        const rangeAreaData = xAxisData.map((xAxisValue, index: number) => ({
          x: xAxisValue,
          y: [lowerBoundData[index], upperBoundData[index]]
        }));

        dataSeries.push({
          type: 'rangeArea',
          name: '',
          data: rangeAreaData
        });
      }
    } else {
      dataSeries.push({
        type: 'line',
        name: '',
        data: [0, 0]
      });
    }

    return dataSeries;
  }
}
