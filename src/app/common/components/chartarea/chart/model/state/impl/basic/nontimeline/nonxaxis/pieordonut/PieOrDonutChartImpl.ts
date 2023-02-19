/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DimensionVisualizationType } from '../../../../../selecteddimension/types/DimensionVisualizationType';
import AbstractNonTimelineChart from '../../AbstractNonTimelineChart';
import type { SelectedDimension } from '../../../../../selecteddimension/SelectedDimension';
import type { DataSeries } from '../../../../../types/DataSeries';
import type { SelectedMeasure } from '../../../../../selectedmeasure/SelectedMeasure';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import type { MeasureVisualizationType } from '../../../../../selectedmeasure/types/MeasureVisualizationType';
import type { LegendPosition } from '../../../../../types/LegendPosition';

export default class PieOrDonutChartImpl extends AbstractNonTimelineChart {
  getApexChartDataSeries(): DataSeries[] | any[] {
    const emptyData: any[] = [0];

    if (this.selectedMeasures.length === 1) {
      const measureData = this.chartData.getForSelectedMeasure(this.selectedMeasures[0]);
      return measureData?.length > 0 ? measureData : emptyData;
    } else if (this.selectedMeasures.length > 1) {
      return this.selectedMeasures.map(
        (selectedMeasure: SelectedMeasure) => this.chartData.getForSelectedMeasure(selectedMeasure)[0] ?? 0
      );
    }

    return emptyData;
  }

  getColors(): string[] {
    return super.getAllColors();
  }

  getConvertedSelectedDimensions(): SelectedDimension[] {
    const convertedSelectedDimensions: SelectedDimension[] = [];

    if (this.selectedDimensions.length >= 1) {
      convertedSelectedDimensions.push({
        ...this.selectedDimensions[0],
        visualizationType: 'Legend'
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
    if (this.hasSelectedDimensionOfType('Legend')) {
      return [dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Drilldown')];
    } else {
      return [dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Legend')];
    }
  }

  getLabels(): string[] {
    if (this.selectedDimensions.length === 0) {
      if (this.selectedMeasures.length === 1) {
        return [this.selectedMeasures[0].measure.name];
      } else if (this.selectedMeasures.length > 1) {
        return this.selectedMeasures.map(({ measure: { name } }: SelectedMeasure) => name);
      }
    } else if (this.selectedMeasures.length === 1) {
      return this.chartData.getForSelectedDimension(
        this.currentDrillDownSelectedDimension ?? this.selectedDimensions[0]
      );
    }

    return [''];
  }

  getNextDimensionVisualizationType(): DimensionVisualizationType {
    return this.hasSelectedDimensionOfType('Legend') ? super.getNextDimensionVisualizationType() : 'Legend';
  }

  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'none';
  }

  getPrimarySelectedDimensionType(): DimensionVisualizationType {
    return 'Legend';
  }

  hasFloatingSubtitle(): boolean {
    return true;
  }

  hasFloatingTitle(): boolean {
    return true;
  }

  isPieOrDonutWithMultipleMeasuresOnly(): boolean {
    return this.selectedDimensions.length === 0 && this.selectedMeasures.length > 1;
  }

  shouldShowDataLabels(): boolean {
    return true;
  }

  shouldShowDataLabelsDropShadow(): boolean {
    return true;
  }

  shouldShowLegend(): [boolean, LegendPosition] {
    return [!(this.selectedDimensions.length === 0 && this.selectedMeasures.length === 1), 'right'];
  }

  supportsDataPointsCount(): boolean {
    return true;
  }
}
