import React from 'react';
import ChartFactory from '../ChartFactory';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { ChartType } from '../types/ChartType';
import type { Chart } from '../Chart';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import DimensionDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/DimensionDropZoneListItemViewFactory';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import AbstractDrillDownChart from './AbstractDrillDownChart';
import MapView from '../../../view/map/MapView';
import MeasureDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class MapChart extends AbstractDrillDownChart {
  handleDataPointSelectionOrDrilldown(): void {
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
      this.data.getForSelectedDimensionOfType(this.selectedDimensions, 'Latitude').length > 0 &&
      this.data.getForSelectedDimensionOfType(this.selectedDimensions, 'Longitude').length > 0
    );
  }

  createView(width: number, height: number, stateNamespace: ChartAreaStateNamespace): JSX.Element {
    return <MapView chart={this} stateNamespace={stateNamespace} />;
  }

  override getNewChartOfType(newChartType: ChartType): Chart {
    this.type = newChartType;
    this.selectedDimensions = [];
    return ChartFactory.createChart(this.getConfiguration());
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

  getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    const measureDropZoneListItemViews = [];

    if (!this.hasSelectedMeasureOfType('color')) {
      measureDropZoneListItemViews.push(
        measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('color', 'color', 'color intensity')
      );
    }

    if (!this.hasSelectedMeasureOfType('radius')) {
      measureDropZoneListItemViews.push(
        measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('radius', 'radius', 'circle radius')
      );
    }

    measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('tooltip', 'tooltip', 'tooltip value');
    return measureDropZoneListItemViews;
  }
}
