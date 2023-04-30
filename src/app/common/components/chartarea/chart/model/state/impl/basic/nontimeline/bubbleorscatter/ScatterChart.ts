/* eslint-disable @typescript-eslint/no-explicit-any */
import AbstractBubbleOrScatterChart from './AbstractBubbleOrScatterChart';
import type { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import type { DataSeries } from '../../../../types/DataSeries';
import MeasureDropZoneListItemViewFactory from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class ScatterChart extends AbstractBubbleOrScatterChart {
  override getConvertSelectedMeasures(): SelectedMeasure[] {
    this.selectedMeasures = this.selectedMeasures.slice(0, 2);
    return super.getConvertSelectedMeasures();
  }

  override getApexDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];

    if (this.hasData()) {
      const [xAxisData, yAxisData, legendData] = this.data.getScatterChartData(
        this.selectedMeasures,
        this.selectedDimensions
      );

      if (legendData.length > 0) {
        legendData.forEach((value: any, index: number) => {
          const foundDataSeries = dataSeries.find(({ name }: DataSeries) => name === value);

          if (foundDataSeries == null) {
            dataSeries.push({
              name: value,
              data: [[xAxisData[index], yAxisData[index]]]
            });
          } else {
            foundDataSeries.data.push([xAxisData[index], yAxisData[index]]);
          }
        });
      } else {
        const data = xAxisData.map((xAxisValue: any, index: number) => [xAxisValue, yAxisData[index]]);

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
        data: []
      });
    }

    return dataSeries;
  }

  override getConfigHintTitle(): string {
    if (this.selectedMeasures.length === 1) {
      return 'Add one more measure';
    }

    return super.getConfigHintTitle();
  }

  override getNextMeasureVisualizationType(
    selectedMeasureType?: MeasureVisualizationType,
    selectedMeasureIndex?: number
  ): MeasureVisualizationType {
    switch (selectedMeasureIndex ?? this.selectedMeasures.length) {
      case 0:
        return 'x-axis';
      case 1:
        return 'y-axis';
      default:
        return 'none';
    }
  }

  override getSupportedMeasureVisualizationTypes(
    selectedMeasure: SelectedMeasure,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    supportedMeasureVisualizationTypes?: MeasureVisualizationType[]
  ): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['x-axis', 'y-axis']);
  }

  override hasData(): boolean {
    const [xAxisData, yAxisData] = this.data.getScatterChartData(this.selectedMeasures, this.selectedDimensions);

    return (
      this.selectedDimensions.length > 0 &&
      xAxisData.length > 0 &&
      yAxisData.length > 0 &&
      xAxisData.length === yAxisData.length
    );
  }

  override getTitleText(): string {
    const xAxisMeasureName = this.selectedMeasures.reduce(
      (measureName, selectedMeasure) =>
        selectedMeasure.visualizationType === 'x-axis' ? selectedMeasure.measure.name : measureName,
      ''
    );

    const yAxisMeasureName = this.selectedMeasures.reduce(
      (measureName, selectedMeasure) =>
        selectedMeasure.visualizationType === 'y-axis' ? selectedMeasure.measure.name : measureName,
      ''
    );

    return `X: ${xAxisMeasureName}, Y: ${yAxisMeasureName}`;
  }

  getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    const measureDropZoneListItemViews = [];

    if (!this.hasSelectedMeasureOfType('x-axis')) {
      measureDropZoneListItemViews.push(
        measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('x-axis', 'x-axis', 'x-axis')
      );
    }

    if (!this.hasSelectedMeasureOfType('y-axis')) {
      measureDropZoneListItemViews.push(
        measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('y-axis', 'y-axis', 'y-axis')
      );
    }

    return measureDropZoneListItemViews;
  }
}
