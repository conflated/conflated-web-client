/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import AbstractDrillDownChart from './AbstractDrillDownChart';

export default class StatisticChart extends AbstractDrillDownChart {
  override createView(): JSX.Element {
    const statisticElements = this.selectedMeasures.map((selectedMeasure: SelectedMeasure): JSX.Element => {
      const measureValues = this.data.getForSelectedMeasure(selectedMeasure);
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
          <Statistic.Label
            style={{
              color: selectedMeasure.measure.unit === 'percent' && measureValues[0] > 80 ? '#E23B3B' : '#999'
            }}
          >
            {selectedMeasure.measure.name}
          </Statistic.Label>
          <Statistic.Value>
            <span
              style={{
                color: selectedMeasure.measure.unit === 'percent' && measureValues[0] > 80 ? '#E23B3B' : '#000'
              }}
            >
              {measureValues[0] ?? 0}
            </span>
            <span
              style={{
                color: selectedMeasure.measure.unit === 'percent' && measureValues[0] > 80 ? '#E23B3B' : '#000',
                fontSize: '1.75rem'
              }}
            >
              {selectedMeasure.measure.unit === 'percent' ? `.${Math.floor(Math.random() * 10).toString()}` : ''}
            </span>
            <span
              style={{
                color: selectedMeasure.measure.unit === 'percent' && measureValues[0] > 80 ? '#E23B3B' : '#000',
                fontSize: '1.25rem',
                paddingLeft: '0.3rem'
              }}
            >
              {selectedMeasure.measure.unit !== 'none' ? unit : ''}
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

  handleDataPointSelectionOrDrilldown(): void {}

  sliceOrFillXAxisData(data: Array<any>): Array<any> {
    return data;
  }
}
