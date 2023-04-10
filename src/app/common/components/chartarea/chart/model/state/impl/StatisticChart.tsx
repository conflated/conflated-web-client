/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import AbstractDrillDownChart from './AbstractDrillDownChart';

export default class StatisticChart extends AbstractDrillDownChart {
  override handleChartJsClick(): void {
    throw new Error('Method not implemented.');
  }

  override addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    super.addSelectedDimension(dimension, visualizationType);
  }

  override addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    if (this.selectedDimensions.length >= 1) {
      this.selectedMeasures = [];
    }

    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  override createChartView(): JSX.Element {
    const statisticElements = this.selectedMeasures.map((selectedMeasure: SelectedMeasure): JSX.Element => {
      const measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);
      let unit;

      switch (selectedMeasure.measure.unit) {
        case 'percent':
          unit = '%';
          break;
        case 'dollar':
          unit = '$';
          break;
        case 'euro':
          unit = '€';
          break;
        case 'pound':
          unit = '£';
          break;
        default:
          unit = '';
      }

      return (
        <Statistic key={this.id + selectedMeasure.measure.name}>
          <Statistic.Label style={{ color: measureValues[0] > 80 ? '#E23B3B' : '#666' }}>
            {selectedMeasure.measure.name}
          </Statistic.Label>
          <Statistic.Value>
            <span style={{ color: measureValues[0] > 80 ? '#E23B3B' : '#000' }}>{measureValues[0] ?? 0}</span>
            <span style={{ color: measureValues[0] > 80 ? '#E23B3B' : '#000', fontSize: '1.75rem' }}>.1</span>
            <span
              style={{ color: measureValues[0] > 80 ? '#E23B3B' : '#000', fontSize: '1.25rem', paddingLeft: '0.3rem' }}
            >
              {unit}
            </span>
          </Statistic.Value>
        </Statistic>
      );
    });

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{statisticElements}</>;
  }

  override getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  override getNextMeasureVisualizationType(): MeasureVisualizationType {
    return 'color';
  }

  override getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, []);
  }

  supportsMeasureVisualizationColor(): boolean {
    return true;
  }

  getDimensionDropZoneListItemViews(): Array<JSX.Element> {
    return [];
  }

  handleDataPointSelection(): void {}

  sliceOrFillXAxisData(data: Array<any>): Array<any> {
    return data;
  }
}
