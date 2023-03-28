import React from 'react';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import AgGridDataTableChartView from '../../../view/datatable/AgGridDataTableChartView';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { ChartAreaStateNamespace } from '../../../../model/state/types/ChartAreaStateNamespace';
import AbstractDrillDownChart from './AbstractDrillDownChart';
import AgGridAlertsDataTableChartView from '../../../../../../../pages/alerts/chartarea/chart/view/AgGridAlertsDataTableChartView';
import AgGridGoalsDataTableChartView from '../../../../../../../pages/goals/chartarea/chart/view/AgGridGoalsDataTableChartView';

export default class DataTableChart extends AbstractDrillDownChart {
  override handleChartJsClick(): void {
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
      return <AgGridAlertsDataTableChartView actions={actions} chart={this} width={width} height={height} />;
    } else if (stateNamespace === 'goalsPage') {
      return <AgGridGoalsDataTableChartView chart={this} width={width} height={height} />;
    }

    return <AgGridDataTableChartView chart={this} />;
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
}
