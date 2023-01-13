import TimelineChartImpl from '../TimelineChartImpl';
import type { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import type { DataSeries } from '../../../../types/DataSeries';

export default class CandlestickChartImpl extends TimelineChartImpl {
  getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 4);
    return super.getConvertSelectedMeasures();
  }

  // eslint-disable-next-line no-unused-vars
  getApexChartDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];
    const openData = this.chartData.getForSelectedMeasureOfType(this.selectedMeasures, 'open');
    const highData = this.chartData.getForSelectedMeasureOfType(this.selectedMeasures, 'high');
    const lowData = this.chartData.getForSelectedMeasureOfType(this.selectedMeasures, 'low');
    const closeData = this.chartData.getForSelectedMeasureOfType(this.selectedMeasures, 'close');
    const timelineData = this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Timeline');

    if (
      openData.length > 0 &&
      highData.length > 0 &&
      lowData.length > 0 &&
      closeData.length > 0 &&
      timelineData.length > 0 &&
      openData.length === highData.length &&
      highData.length === lowData.length &&
      lowData.length === closeData.length &&
      timelineData.length === closeData.length
    ) {
      const data = timelineData.map((xValue: any, index: number) => ({
        x: xValue,
        y: [openData[index], highData[index], lowData[index], closeData[index]]
      }));

      dataSeries.push({
        name: '',
        data
      });
    } else {
      dataSeries.push({
        name: '',
        data: [
          {
            x: '',
            y: [0, 0, 0, 0]
          }
        ]
      });
    }

    return dataSeries;
  }

  getNextMeasureVisualizationType(
    measureVisualizationType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType {
    switch (selectedMeasureIndex ?? this.selectedMeasures.length) {
      case 0:
        return 'open';
      case 1:
        return 'high';
      case 2:
        return 'low';
      case 3:
        return 'close';
      default:
        return 'none';
    }
  }

  getStrokeWidth(): number {
    return 1.5;
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['open', 'high', 'low', 'close']);
  }

  isZoomable(): boolean {
    return true;
  }

  shouldShowStroke(): boolean {
    return true;
  }

  shouldShowYAxisTooltip(): boolean {
    return true;
  }
}
