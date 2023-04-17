import React from 'react';
import type { SelectedMeasure } from '../../../selectedmeasure/SelectedMeasure';
import AbstractTimelineChart from './AbstractTimelineChart';
import type { MeasureVisualizationType } from '../../../selectedmeasure/types/MeasureVisualizationType';
import type { FillType } from '../../../types/FillType';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DimensionVisualizationType } from '../../../selecteddimension/DimensionVisualizationType';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import type { ChartAreaStateNamespace } from '../../../../../../model/state/types/ChartAreaStateNamespace';
import ApexChartView from '../../../../../view/basic/ApexChartView';

export default class SparklineChart extends AbstractTimelineChart {
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

  override createView(width: number, height: number, stateNamespace: ChartAreaStateNamespace): JSX.Element {
    if (this.selectedMeasures.length === 1 && this.selectedDimensions.length === 1) {
      return (
        <div key={this.id} style={{ height: '100%' }}>
          <ApexChartView chart={this} width={0} height={0} stateNamespace={stateNamespace} />
        </div>
      );
    }

    return <div />;
  }

  override getApexType(): string {
    if (this.selectedMeasures.length === 1) {
      const { visualizationType } = this.selectedMeasures[0];
      return visualizationType === 'column' ? 'bar' : visualizationType;
    } else {
      return 'bar';
    }
  }

  override getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  override getFillType(): FillType {
    return 'gradient';
  }

  override getGradientFillType(): FillType | FillType[] {
    return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
      visualizationType === 'area' ? 'gradient' : 'solid'
    );
  }

  override getNextMeasureVisualizationType(
    measureVisualizationType?: MeasureVisualizationType
  ): MeasureVisualizationType {
    if (measureVisualizationType === 'line' || measureVisualizationType === 'area') {
      return measureVisualizationType;
    }

    return 'column';
  }

  override getStrokeWidth(): number | number[] {
    if (this.selectedDimensions.length === 1) {
      return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
        visualizationType === 'column' ? 0 : 3
      );
    }

    return 0;
  }

  override getSubtitleText(): string {
    if (this.selectedMeasures.length === 1) {
      return this.selectedMeasures[0].measure.name;
    }

    return super.getSubtitleText();
  }

  override getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['column', 'line', 'area']);
  }

  override getTitleText(): string {
    if (this.selectedMeasures.length === 1) {
      const measureData = this.data.getForSelectedMeasure(this.selectedMeasures[0]);
      const title = measureData.length > 0 ? measureData[measureData.length - 1] : '';

      switch (this.selectedMeasures[0].measure.unit) {
        case 'percent':
          return `${title}%`;
        case 'dollar':
          return `$${title}`;
        case 'euro':
          return `${title}€`;
        case 'pound':
          return `£${title}`;
        default:
          return title;
      }
    }

    return super.getTitleText();
  }

  override hasFloatingTitle(): boolean {
    return false;
  }

  override hasLargerTitle(): boolean {
    return true;
  }

  override shouldShowAsSparkline(): boolean {
    return true;
  }

  override shouldShowDataLabels(): boolean {
    return false;
  }

  override shouldShowStroke(): boolean {
    return true;
  }

  supportsMeasureVisualizationColor(): boolean {
    return this.selectedDimensions.length === 1;
  }
}
