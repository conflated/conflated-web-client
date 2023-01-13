import React from 'react';
import ChartFactory from '../../factory/ChartFactory';
import type { MeasureVisualizationType } from '../../selectedmeasure/types/MeasureVisualizationType';
import type { ChartType } from '../../types/ChartType';
import type { Chart } from '../../Chart';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { ChartAreaPageStateNamespace } from '../../../../../model/state/namespace/ChartAreaPageStateNamespace';
import LeafletMapView from '../../../../view/map/leaflet/LeafletMapView';
import DimensionDropZoneListItemViewFactory from '../../../../../../../../pages/dataexplorer/leftpane/dimensionselector/view/dimensiondropzonelistitemviewfactory/DimensionDropZoneListItemViewFactory';
import type { DimensionVisualizationType } from '../../selecteddimension/types/DimensionVisualizationType';
import DrillDownChartImpl from '../DrillDownChartImpl';

export default class MapChartImpl extends DrillDownChartImpl {
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

  getNextDimensionVisualizationType(): DimensionVisualizationType {
    if (!this.hasSelectedDimensionOfType('Latitude')) {
      return 'Latitude';
    } else if (!this.hasSelectedDimensionOfType('Longitude')) {
      return 'Longitude';
    } else if (this.hasSelectedDimensionOfType('Latitude') && this.hasSelectedDimensionOfType('Longitude')) {
      return 'Tooltip';
    }

    return super.getNextDimensionVisualizationType();
  }

  hasData(): boolean {
    return (
      this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Latitude').length > 0 &&
      this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Longitude').length > 0
    );
  }

  createChartView(width: number, height: number, stateNamespace: ChartAreaPageStateNamespace): JSX.Element {
    return <LeafletMapView chart={this} stateNamespace={stateNamespace} />;
  }

  getNewChartOfType(newChartType: ChartType): Chart {
    this.chartType = newChartType;
    this.selectedDimensions = [];
    return ChartFactory.createChart(this.getChartConfiguration());
  }

  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'color';
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['color', 'radius', 'tooltip']);
  }

  // noinspection JSMethodCanBeStatic
  supportsMeasureVisualizationColor(): boolean {
    return true;
  }
}
