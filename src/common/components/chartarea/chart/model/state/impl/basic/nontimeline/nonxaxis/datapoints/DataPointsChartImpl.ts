/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DimensionVisualizationType } from '../../../../../selecteddimension/types/DimensionVisualizationType';
import type { FillType } from '../../../../../types/FillType';
import type { SelectedDimension } from '../../../../../selecteddimension/SelectedDimension';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import NonTimelineChartImpl from '../../NonTimelineChartImpl';
import type { LegendPosition } from '../../../../../types/LegendPosition';

export default class DataPointsChartImpl extends NonTimelineChartImpl {
  getApexXAxisOptions(): object {
    return {
      type: 'category',
      axisBorder: { show: this.selectedMeasures.length > 0 }
    };
  }

  getColors(): string[] {
    const dataPointsSelectedDimension = this.getSelectedDimensionOfType('Data points');

    return this.hasSelectedDimensionOfType('Legend')
      ? super.getAllColors()
      : [dataPointsSelectedDimension?.visualizationColor ?? super.getAllColors()[0]];
  }

  getConvertedSelectedDimensions(): SelectedDimension[] {
    const convertedSelectedDimensions: SelectedDimension[] = [];

    if (this.selectedDimensions.length >= 1) {
      convertedSelectedDimensions.push({
        ...this.selectedDimensions[0],
        visualizationType: 'Data points'
      });
    }

    if (this.selectedDimensions.length >= 2) {
      this.selectedDimensions.slice(1).forEach((selectedDimension: SelectedDimension) =>
        convertedSelectedDimensions.push({
          ...selectedDimension,
          visualizationType: 'Drilldown'
        })
      );
    }

    return convertedSelectedDimensions;
  }

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    if (!this.hasSelectedDimensionOfType('Data points')) {
      return [dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Data points')];
    }

    return [];
  }

  getFillOpacity(): number {
    return 0.8;
  }

  getFillType(): FillType {
    return 'solid';
  }

  getNextDimensionVisualizationType(): DimensionVisualizationType {
    return this.hasSelectedDimensionOfType('Data points') ? super.getNextDimensionVisualizationType() : 'Data points';
  }

  getPrimarySelectedDimensionType(): DimensionVisualizationType {
    return 'Data points';
  }

  getTooltipXValueFormatter(): (value: any, params: object) => string {
    return (value: any, { dataPointIndex }: any): string => {
      const dataPointsData = this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Data points');

      if (dataPointsData.length >= dataPointIndex) {
        return dataPointsData[dataPointIndex];
      }

      return '';
    };
  }

  getTooltipYValueFormatter(): (value: any, params: object) => string {
    return (value: any, { dataPointIndex }: any): string => {
      const xAxisData = this.chartData.getForSelectedMeasureOfType(this.selectedMeasures, 'x-axis');

      if (xAxisData.length >= dataPointIndex) {
        return `x: ${xAxisData[dataPointIndex]}, y: ${value}`;
      }

      return '';
    };
  }

  hasFollowCursorTooltip(): boolean {
    return true;
  }

  hasIntersectTooltip(): boolean {
    return true;
  }

  isZoomable(): boolean {
    return true;
  }

  shouldShowDataLabels(): boolean {
    return false;
  }

  shouldShowLegend(): [boolean, LegendPosition] {
    return [this.hasSelectedDimensionOfType('Legend'), 'bottom'];
  }

  supportsDataPointsCount(): boolean {
    return true;
  }

  supportsSelectedDimensionVisualizationColor(): boolean {
    return !this.hasSelectedDimensionOfType('Legend');
  }
}
