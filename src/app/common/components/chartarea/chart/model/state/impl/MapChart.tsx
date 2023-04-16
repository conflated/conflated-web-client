import React from 'react';
import ChartFactory from '../ChartFactory';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { ChartType } from '../types/ChartType';
import type { Chart } from '../Chart';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import DimensionDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import AbstractDrillDownChart from './AbstractDrillDownChart';
import MapView from '../../../view/map/MapView';

export default class MapChart extends AbstractDrillDownChart {
  handleDataPointSelection(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliceOrFillXAxisData(): any[] {
    throw new Error('Method not implemented.');
  }

  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    const dimensionDropZoneListItemViews = [];

    if (!this.hasSelectedDimensionOfType('Latitude')) {
      dimensionDropZoneListItemViews.push(
        dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('1', 'Latitude')
      );
    }

    if (!this.hasSelectedDimensionOfType('Longitude')) {
      dimensionDropZoneListItemViews.push(
        dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('2', 'Longitude')
      );
    }

    dimensionDropZoneListItemViews.push(
      dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('3', 'Tooltip')
    );

    return dimensionDropZoneListItemViews;
  }

  override getNextDimensionVisualizationType(): DimensionVisualizationType {
    if (!this.hasSelectedDimensionOfType('Latitude')) {
      return 'Latitude';
    } else if (!this.hasSelectedDimensionOfType('Longitude')) {
      return 'Longitude';
    } else if (this.hasSelectedDimensionOfType('Latitude') && this.hasSelectedDimensionOfType('Longitude')) {
      return 'Tooltip';
    }

    return super.getNextDimensionVisualizationType();
  }

  override hasData(): boolean {
    return (
      this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Latitude').length > 0 &&
      this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Longitude').length > 0
    );
  }

  createChartView(width: number, height: number, stateNamespace: ChartAreaStateNamespace): JSX.Element {
    return <MapView chart={this} stateNamespace={stateNamespace} />;
  }

  override getNewChartOfType(newChartType: ChartType): Chart {
    this.chartType = newChartType;
    this.selectedDimensions = [];
    return ChartFactory.createChart(this.getChartConfiguration());
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'color';
  }

  override getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['color', 'radius', 'tooltip']);
  }

  // noinspection JSMethodCanBeStatic
  supportsMeasureVisualizationColor(): boolean {
    return true;
  }
}
