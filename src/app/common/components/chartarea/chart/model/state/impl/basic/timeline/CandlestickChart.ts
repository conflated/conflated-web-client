import AbstractTimelineChart from './AbstractTimelineChart';
import type { MeasureVisualizationType } from '../../../selectedmeasure/types/MeasureVisualizationType';
import type { SelectedMeasure } from '../../../selectedmeasure/SelectedMeasure';
import type { DataSeries } from '../../../types/DataSeries';

export default class CandlestickChart extends AbstractTimelineChart {
  override getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 4);
    return super.getConvertSelectedMeasures();
  }

  // eslint-disable-next-line no-unused-vars
  override getApexDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];
    const openData = this.data.getForSelectedMeasureOfType(this.selectedMeasures, 'open');
    const highData = this.data.getForSelectedMeasureOfType(this.selectedMeasures, 'high');
    const lowData = this.data.getForSelectedMeasureOfType(this.selectedMeasures, 'low');
    const closeData = this.data.getForSelectedMeasureOfType(this.selectedMeasures, 'close');
    const timelineData = this.data.getForSelectedDimensionOfType(this.selectedDimensions, 'Timeline');

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  override getNextMeasureVisualizationType(
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

  override getStrokeWidth(): number {
    return 1.5;
  }

  override getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['open', 'high', 'low', 'close']);
  }

  override isZoomable(): boolean {
    return true;
  }

  override shouldShowStroke(): boolean {
    return true;
  }

  override shouldShowYAxisTooltip(): boolean {
    return true;
  }
}
