import React from 'react';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { DimensionVisualizationType } from '../selecteddimension/DimensionVisualizationType';
import AgGridDataTableChartView from '../../../view/datatable/AgGridDataTableChartView';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import AbstractDrillDownChart from './AbstractDrillDownChart';
import AgGridAlertsDataTableChartView from '../../../../../../../page/alerts/chartarea/chart/view/AgGridAlertsDataTableChartView';
import AgGridGoalsDataTableChartView from '../../../../../../../page/goals/chartarea/chart/view/AgGridGoalsDataTableChartView';
import DimensionDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/view/DimensionDropZoneListItemViewFactory';
import MeasureDropZoneListItemViewFactory from '../../../../../../../page/dataexplorer/pane/left/selector/measure/view/MeasureDropZoneListItemViewFactory';

export default class DataTableChart extends AbstractDrillDownChart {
  getDimensionDropZoneListItemViews(
    dimensionDropZoneListItemViewFactory: DimensionDropZoneListItemViewFactory
  ): JSX.Element[] {
    const dimensionDropZoneListItemViews = [];

    dimensionDropZoneListItemViews.push(
      dimensionDropZoneListItemViewFactory.createDimensionDropZoneListItem('3', 'Drilldown', 'In-place drilldown')
    );

    return dimensionDropZoneListItemViews;
  }

  handleDataPointSelectionOrDrilldown(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliceOrFillXAxisData(): any[] {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line no-unused-vars
  createView(
    width: number,
    height: number,
    stateNamespace: ChartAreaStateNamespace,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: Record<string, (...args: any[]) => void>
  ): JSX.Element {
    if (stateNamespace === 'alertsPage' || stateNamespace === 'alertDetailsDialog') {
      return <AgGridAlertsDataTableChartView actions={actions} chart={this} width={width} height={height} />;
    } else if (stateNamespace === 'goalsPage') {
      return <AgGridGoalsDataTableChartView chart={this} width={width} height={height} />;
    }

    return <AgGridDataTableChartView chart={this} height={height} />;
  }

  override getNextDimensionVisualizationType(): DimensionVisualizationType {
    return 'Column';
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'text';
  }

  override getPrimarySelectedDimensionType(): DimensionVisualizationType | null {
    return 'Column';
  }

  override getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['text']);
  }

  getMeasureDropZoneListItemViews(
    measureDropZoneListItemViewFactory: MeasureDropZoneListItemViewFactory
  ): Array<JSX.Element> {
    return [measureDropZoneListItemViewFactory.createMeasureDropZoneListItem('1', 'column', 'column')];
  }
}
