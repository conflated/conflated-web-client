/* eslint-disable @typescript-eslint/no-explicit-any */
import type { DimensionVisualizationType } from '../../../../selecteddimension/DimensionVisualizationType';
import AbstractNonTimelineChart from '../AbstractNonTimelineChart';
import type { SelectedDimension } from '../../../../selecteddimension/SelectedDimension';
import type { DataSeries } from '../../../../types/DataSeries';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/DimensionDropZoneListItemViewFactory';
import type { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import type { LegendPosition } from '../../../../types/LegendPosition';
import MeasureDropZoneListItemViewFactory from '../../../../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class PieOrDonutChartImpl extends AbstractNonTimelineChart {
  override getApexDataSeries(): DataSeries[] | any[] {
    const emptyData: any[] = [0];

    if (this.selectedMeasures.length === 1) {
      const measureData = this.data.getForSelectedMeasure(this.selectedMeasures[0]);
      return measureData?.length > 0 ? measureData : emptyData;
    } else if (this.selectedMeasures.length > 1) {
      return this.selectedMeasures.map(
        (selectedMeasure: SelectedMeasure) => this.data.getForSelectedMeasure(selectedMeasure)[0] ?? 0
      );
    }

    return emptyData;
  }

  override getColors(): string[] {
    return super.getAllColors();
  }

  override getConvertedSelectedDimensions(): SelectedDimension[] {
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

  override getLabels(): string[] {
    if (this.selectedDimensions.length === 0) {
      if (this.selectedMeasures.length === 1) {
        return [this.selectedMeasures[0].measure.name];
      } else if (this.selectedMeasures.length > 1) {
        return this.selectedMeasures.map(({ measure: { name } }: SelectedMeasure) => name);
      }
    } else if (this.selectedMeasures.length === 1) {
      return this.data.getForSelectedDimension(this.currentDrillDownSelectedDimension ?? this.selectedDimensions[0]);
    }

    return [''];
  }

  override getNextDimensionVisualizationType(): DimensionVisualizationType {
    return this.hasSelectedDimensionOfType('Legend') ? super.getNextDimensionVisualizationType() : 'Legend';
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'pieOrDonut';
  }

  override getPrimarySelectedDimensionType(): DimensionVisualizationType {
    return 'Legend';
  }

  override hasFloatingSubtitle(): boolean {
    return false;
  }

  override hasFloatingTitle(): boolean {
    return false;
  }

  override isPieOrDonutWithMultipleMeasuresOnly(): boolean {
    return this.selectedDimensions.length === 0 && this.selectedMeasures.length > 1;
  }

  override shouldShowDataLabels(): boolean {
    return true;
  }

  override shouldShowDataLabelsDropShadow(): boolean {
    return false;
  }

  override shouldShowLegend(): [boolean, LegendPosition] {
    return [!(this.selectedDimensions.length === 0 && this.selectedMeasures.length === 1), 'right'];
  }

  override supportsDataPointsCount(): boolean {
    return true;
  }

  override getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    if (this.hasSelectedMeasureOfType('pieOrDonut')) {
      return [];
    } else {
      return [measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('1', 'pieOrDonut', 'measure')];
    }
  }
}
