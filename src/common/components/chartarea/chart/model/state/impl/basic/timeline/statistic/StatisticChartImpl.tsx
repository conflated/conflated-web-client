import React from 'react';
import { Statistic } from 'semantic-ui-react';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import TimelineChartImpl from '../TimelineChartImpl';
import type { MeasureVisualizationType } from '../../../../selectedmeasure/types/MeasureVisualizationType';
import type { FillType } from '../../../../types/FillType';
import type { Dimension } from '../../../../../../../../../../dataexplorerpage/leftpane/dimensionselector/model/state/entities/Dimension';
import type { Measure } from '../../../../../../../../../../dataexplorerpage/leftpane/measureselector/model/state/entities/Measure';
import type { DimensionVisualizationType } from '../../../../selecteddimension/types/DimensionVisualizationType';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { ChartAreaPageStateNamespace } from '../../../../../../../model/state/namespace/ChartAreaPageStateNamespace';
import ApexChartView from '../../../../../../view/basic/apex/ApexChartView';

export default class StatisticChartImpl extends TimelineChartImpl {
  addSelectedDimension(dimension: Dimension | Measure, visualizationType: DimensionVisualizationType) {
    this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    super.addSelectedDimension(dimension, visualizationType);
  }

  addSelectedMeasure(measureOrDimension: Measure | Dimension, aggregationFunction: AggregationFunction) {
    if (this.selectedDimensions.length >= 1) {
      this.selectedMeasures = [];
    }

    super.addSelectedMeasure(measureOrDimension, aggregationFunction);
  }

  createChartView(width: number, height: number, stateNamespace: ChartAreaPageStateNamespace): JSX.Element {
    if (this.selectedDimensions.length === 0) {
      const statisticElements = this.selectedMeasures.map((selectedMeasure: SelectedMeasure): JSX.Element => {
        const measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);
        return (
          <Statistic key={this.id + selectedMeasure.measure.name}>
            <Statistic.Value>{measureValues[0] ?? 0}</Statistic.Value>
            <Statistic.Label>{selectedMeasure.measure.name.toUpperCase()}</Statistic.Label>
          </Statistic>
        );
      });

      // eslint-disable-next-line react/jsx-no-useless-fragment
      return <>{statisticElements}</>;
    } else if (this.selectedMeasures.length === 1 && this.selectedDimensions.length === 1) {
      return (
        <div key={this.id}>
          <ApexChartView chart={this} width={0} height={0} pageStateNamespace={stateNamespace} />
        </div>
      );
    }

    return <div />;
  }

  getApexChartType(): string {
    if (this.selectedMeasures.length === 1) {
      const { visualizationType } = this.selectedMeasures[0];
      return visualizationType === 'column' ? 'bar' : visualizationType;
    } else {
      return 'bar';
    }
  }

  getConvertSelectedMeasures(): SelectedMeasure[] {
    if (this.selectedDimensions.length > 0) {
      this.selectedMeasures = this.selectedMeasures.slice(0, 1);
    }

    return super.getConvertSelectedMeasures();
  }

  getFillType(): FillType {
    return 'gradient';
  }

  getGradientFillType(): FillType | FillType[] {
    return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
      visualizationType === 'area' ? 'gradient' : 'solid'
    );
  }

  getNextMeasureVisualizationType(measureVisualizationType?: MeasureVisualizationType): MeasureVisualizationType {
    if (measureVisualizationType === 'line' || measureVisualizationType === 'area') {
      return measureVisualizationType;
    }

    return 'column';
  }

  getStrokeWidth(): number | number[] {
    if (this.selectedDimensions.length === 1) {
      return this.selectedMeasures.map(({ visualizationType }: SelectedMeasure) =>
        visualizationType === 'column' ? 0 : 3
      );
    }

    return 0;
  }

  getSubtitleText(): string {
    if (this.selectedMeasures.length === 1) {
      return this.selectedMeasures[0].measure.name;
    }

    return super.getSubtitleText();
  }

  getSupportedMeasureVisualizationTypes(selectedMeasure: SelectedMeasure): MeasureVisualizationType[] {
    return super.getSupportedMeasureVisualizationTypes(selectedMeasure, ['column', 'line', 'area']);
  }

  getTitleText(): string | null {
    if (this.selectedMeasures.length === 1) {
      const measureData = this.chartData.getForSelectedMeasure(this.selectedMeasures[0]);
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

  hasFloatingTitle(): boolean {
    return true;
  }

  hasLargerTitle(): boolean {
    return true;
  }

  shouldShowAsSparkline(): boolean {
    return true;
  }

  shouldShowDataLabels(): boolean {
    return false;
  }

  shouldShowStroke(): boolean {
    return true;
  }

  supportsMeasureVisualizationColor(): boolean {
    return this.selectedDimensions.length === 1;
  }
}
