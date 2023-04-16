import { DataSeries } from '../../../../types/DataSeries';
import { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import { FillType } from '../../../../types/FillType';
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';

export default class RangeAreaChart extends AbstractXAxisCategoriesChart {
  override shouldShowDataLabels(): boolean {
    return false;
  }

  override getColors(): string[] {
    const colors = super.getColors();
    return [colors[0], colors[0]];
  }

  override hasContinuousXAxis(): boolean {
    return true;
  }

  override getStrokeWidth(): number | number[] {
    return [3.0, 0];
  }

  override shouldShowStroke(): boolean {
    return true;
  }

  override getFillType(): FillType {
    return 'solid';
  }

  override getFillOpacity(): number {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [1, 0.2] as any;
  }

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
      const [yAxisData, lowerBoundData, upperBoundData, xAxisData, legendData] = this.chartData.getRangeAreaChartData(
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
          name: 'line',
          data: lineData
        });

        const rangeAreaData = xAxisData.map((xAxisValue, index: number) => ({
          x: xAxisValue,
          y: [lowerBoundData[index], upperBoundData[index]]
        }));

        dataSeries.push({
          type: 'rangeArea',
          name: 'rangeArea',
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
