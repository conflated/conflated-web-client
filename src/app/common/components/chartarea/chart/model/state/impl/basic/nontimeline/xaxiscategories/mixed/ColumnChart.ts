/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractMixedChart from './AbstractMixedChart';
import type { MeasureVisualizationType } from '../../../../../selectedmeasure/types/MeasureVisualizationType';

export default class ColumnChart extends AbstractMixedChart {
  override getLegendType(): string {
    return 'legend, e.g. timestamp';
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'column';
  }

  override handleSelectDataPoint(params: any, actions: Record<string, (...args: any[]) => void>) {
    const { dataPointIndex, selectedDataPoints, w } = params;
    const { setSelectedDataPointIndexForChart } = actions;

    if (this.hasTimestampLegend()) {
      // eslint-disable-next-line no-underscore-dangle
      const foundChartInstance = (window as any).Apex._chartInstances.find(
        (chartInstance: any) => chartInstance.id === this.id
      );

      const twoLabelsSelectedSeries = selectedDataPoints.filter(
        (dataPoints: any[] | null | undefined) => dataPoints && dataPoints.length === 2
      );

      const noLabelsSelectedSeries = selectedDataPoints.filter(
        (dataPoints: any[] | null | undefined) => !dataPoints || dataPoints.length === 0
      );

      const selectedDataPointCount = selectedDataPoints.filter(
        (dataPoints: any[] | null | undefined) => dataPoints && dataPoints.length > 0
      ).length;

      if (
        noLabelsSelectedSeries.length === 1 &&
        selectedDataPointCount === w.globals.series.length - 1 &&
        this.selectedDataPointIndex != null
      ) {
        const removedSelections: any[] = [];
        selectedDataPoints.forEach((dataPoints: any[], seriesIndex: number) =>
          dataPoints.forEach((dataPoint: number) =>
            removedSelections.push({
              seriesIndex,
              dataPoint
            })
          )
        );

        removedSelections.forEach(({ seriesIndex, dataPoint }: any) => {
          this.isInternallyTriggeredDataPointSelection = true;
          foundChartInstance.chart.toggleDataPointSelection(seriesIndex, dataPoint);
        });
      }

      if (
        twoLabelsSelectedSeries.length === 1 &&
        selectedDataPointCount === w.globals.series.length &&
        this.selectedDataPointIndex != null
      ) {
        const seriesIndex = selectedDataPoints.findIndex(
          (dataPoints: any[] | null | undefined) => dataPoints && dataPoints.length === 1
        );

        this.isInternallyTriggeredDataPointSelection = true;
        foundChartInstance.chart.toggleDataPointSelection(seriesIndex, this.selectedDataPointIndex);
        this.isInternallyTriggeredDataPointSelection = true;
        foundChartInstance.chart.toggleDataPointSelection(0, dataPointIndex);
        return;
      }

      if (selectedDataPointCount !== 0 && this.selectedDataPointIndex != null) {
        return;
      } else if (this.selectedDataPointIndex != null) {
        setSelectedDataPointIndexForChart(this, undefined);
      }

      if (selectedDataPointCount === 1 && this.selectedDataPointIndex != null) {
        w.globals.series.forEach((value: number, index: number) => {
          if (
            !selectedDataPoints[index] ||
            (selectedDataPoints[index] && !selectedDataPoints[index].includes(dataPointIndex))
          ) {
            this.isInternallyTriggeredDataPointSelection = true;
            foundChartInstance.chart.toggleDataPointSelection(index, dataPointIndex);
          }
        });
      }

      if (this.selectedDataPointIndex == null) {
        setSelectedDataPointIndexForChart(this, dataPointIndex);
      }
    }

    super.handleSelectDataPoint(params, actions);
  }

  override isXAxisScrollable(): boolean {
    return this.selectedDimensions.length > 0;
  }

  override shouldShowStroke(): boolean {
    return true;
  }

  override supportsAllDimension(): boolean {
    return true;
  }
}
