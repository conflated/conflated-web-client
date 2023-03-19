import React from 'react';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import AgGridDataTableView from '../../../view/datatable/AgGridDataTableView';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import AbstractDrillDownChart from './AbstractDrillDownChart';
import AgGridAlertsDataTableView from '../../../view/datatable/AgGridAlertsDataTableView';
import AgGridGoalsDataTableView from '../../../view/datatable/AgGridGoalsDataTableView';

export default class DataTableChart extends AbstractDrillDownChart {
  handleChartJsClick(): void {
    throw new Error('Method not implemented.');
  }

  getDimensionDropZoneListItemViews(): JSX.Element[] {
    throw new Error('Method not implemented.');
  }

  handleDataPointSelection(): void {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sliceOrFillXAxisData(): any[] {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line no-unused-vars
  createChartView(
    width: number,
    height: number,
    stateNamespace: ChartAreaStateNamespace,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: Record<string, (...args: any[]) => void>
  ): JSX.Element {
    if (stateNamespace === 'alertsPage') {
      return <AgGridAlertsDataTableView actions={actions} chart={this} width={width} height={height} />;
    } else if (stateNamespace === 'goalsPage') {
      return <AgGridGoalsDataTableView chart={this} width={width} height={height} />;
    }

    return <AgGridDataTableView chart={this} />;
  }

  getNextDimensionVisualizationType(): DimensionVisualizationType {
    return 'Column';
  }

  getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'text';
  }

  getPrimarySelectedDimensionType(): DimensionVisualizationType | null {
    return 'Column';
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['text']);
  }
}
