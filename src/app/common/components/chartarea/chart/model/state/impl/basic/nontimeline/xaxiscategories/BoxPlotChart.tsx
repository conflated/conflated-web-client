/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import Color from 'color';
import React from 'react';
import AbstractXAxisCategoriesChart from './AbstractXAxisCategoriesChart';
import type { AggregationFunction } from '../../../../selectedmeasure/types/AggregationFunction';
import type { ChartAreaStateNamespace } from '../../../../../../../model/state/types/ChartAreaStateNamespace';
import type { SelectedMeasure } from '../../../../selectedmeasure/SelectedMeasure';
import type { DataPoint } from '../../../../types/DataPoint';
import type { DrillDown } from '../../../../types/DrillDown';
import ApexChartView from '../../../../../../view/basic/ApexChartView';

export default class BoxPlotChart extends AbstractXAxisCategoriesChart {
  timeoutId: ReturnType<typeof setTimeout> | 0 = 0;

  override lastSelectedDataPoint: DataPoint = {
    dataSeriesIndex: -1,
    labelIndex: -1
  };

  override createChartView(width: number, height: number, stateNamespace: ChartAreaStateNamespace): JSX.Element {
    return <ApexChartView chart={this} height={height} stateNamespace={stateNamespace} width={width} />;
  }

  override getChartJsDataSetsAndLabels(): object {
    const labelSelectedDimension =
      this.currentDrillDownSelectedDimension ?? this.getSelectedDimensionOfType('X-axis categories');

    const hasLegend = this.hasSelectedDimensionOfType('Legend');
    const labelValues = this.chartData.getForSelectedDimension(labelSelectedDimension);
    let uniqueLabels: any[] = [];

    if (labelSelectedDimension && !hasLegend && this.selectedMeasures.length > 0) {
      if (labelValues.length > 0) {
        uniqueLabels = this.sliceOrFillXAxisData(_.uniq(labelValues));
      }
    }

    const dataSets: any[] = [];

    if (this.selectedMeasures.length > 0 && labelSelectedDimension && !hasLegend) {
      this.selectedMeasures.forEach((selectedMeasure: SelectedMeasure, selectedMeasureIndex: number) => {
        const measuresForUniqueLabels: any[] = [];
        const measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);

        if (measureValues.length === labelValues.length && measureValues.length > 0) {
          labelValues.forEach((labelValue: any, index: number) => {
            const uniqueLabelIndex = uniqueLabels.findIndex((label: any) => label === labelValue);
            if (uniqueLabelIndex !== -1) {
              if (measuresForUniqueLabels[uniqueLabelIndex]) {
                measuresForUniqueLabels[uniqueLabelIndex].push(measureValues[index]);
              } else {
                measuresForUniqueLabels[uniqueLabelIndex] = measureValues[index];
              }
            }
          });
        }

        const colors = this.getAllColors();

        dataSets.push({
          label: selectedMeasure.measure.name,
          borderWidth: 2,
          outlierRadius: 3,
          itemRadius: 2,
          outlierColor: colors[selectedMeasureIndex % colors.length],
          backgroundColor: Color(colors[selectedMeasureIndex % colors.length])
            .alpha(0.4)
            .toString(),
          borderColor: colors[selectedMeasureIndex % colors.length],
          data: measuresForUniqueLabels
        });
      });
    } else if (this.selectedMeasures.length === 1 && labelSelectedDimension && hasLegend) {
      const legendValues = this.chartData.getForSelectedDimensionOfType(this.selectedDimensions, 'Legend');
      const measureValues = this.chartData.getForSelectedMeasure(this.selectedMeasures[0]);

      if (
        legendValues.length === labelValues?.length &&
        labelValues.length === measureValues.length &&
        legendValues.length > 0
      ) {
        const uniqueLegendValues = _.uniq(legendValues);

        uniqueLegendValues.forEach((uniqueLegendValue: any, uniqueLegendIndex: number) => {
          const measuresForUniqueLabels: any[] = [];

          labelValues.forEach((labelValue: any, index: number) => {
            if (legendValues[index] === uniqueLegendValue) {
              const uniqueLabelIndex = uniqueLabels.findIndex((label: any) => label === labelValue);
              if (measuresForUniqueLabels[uniqueLabelIndex]) {
                measuresForUniqueLabels[uniqueLabelIndex].push(measureValues[index]);
              } else {
                measuresForUniqueLabels[uniqueLabelIndex] = [measureValues[index]];
              }
            }
          });

          const colors = this.getAllColors();

          dataSets.push({
            label: uniqueLegendValue,
            borderWidth: 2,
            outlierRadius: 3,
            itemRadius: 2,
            outlierColor: colors[uniqueLegendIndex % colors.length],
            backgroundColor: Color(colors[uniqueLegendIndex % colors.length])
              .alpha(0.4)
              .toString(),
            borderColor: colors[uniqueLegendIndex % colors.length],
            data: measuresForUniqueLabels
          });
        });
      }
    }

    uniqueLabels = uniqueLabels.map((uniqueLabel: any, uniqueLabelIndex: number): any => {
      const foundSelectedDataPoint = this.selectedDataPoints.find(
        (selectedDataPoint: DataPoint) => selectedDataPoint.labelIndex === uniqueLabelIndex
      );

      if (foundSelectedDataPoint) {
        return `SELECTED: ${uniqueLabel}`;
      } else {
        return uniqueLabel;
      }
    });

    return {
      labels: uniqueLabels,
      datasets: dataSets
    };
  }

  override getValidAggregationFunction(): AggregationFunction {
    return 'NONE';
  }

  override supportsTooltipSelectedDimension(): boolean {
    return false;
  }

  override getSupportedAggregationFunctions(): AggregationFunction[] {
    return ['NONE'];
  }

  override handleChartJsClick(
    event: any,
    activeElements: any[],
    data: object,
    stateNamespace: ChartAreaStateNamespace,
    actions: Record<string, (...args: any[]) => any>
  ) {
    if (activeElements.length === 1) {
      const clickedDataPoint = {
        // eslint-disable-next-line no-underscore-dangle
        dataSeriesIndex: activeElements[0]._datasetIndex,
        // eslint-disable-next-line no-underscore-dangle
        labelIndex: activeElements[0]._index
      };

      if (
        this.timeoutId &&
        clickedDataPoint.dataSeriesIndex === this.lastSelectedDataPoint.dataSeriesIndex &&
        clickedDataPoint.labelIndex === this.lastSelectedDataPoint.labelIndex
      ) {
        this.handleDrillDown(clickedDataPoint, data, stateNamespace, actions);

        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = 0;
        }
      } else {
        this.lastSelectedDataPoint = {
          dataSeriesIndex: clickedDataPoint.dataSeriesIndex,
          labelIndex: clickedDataPoint.labelIndex
        };

        this.timeoutId = setTimeout(
          () => this.handleSelectJsChartDataPoint(clickedDataPoint, data, stateNamespace, actions),
          450
        );
      }
    }
  }

  handleSelectJsChartDataPoint(
    clickedDataPoint: DataPoint,
    data: any,
    stateNamespace: ChartAreaStateNamespace,
    {
      addSelectionFilterToNotSelectedChartsAction,
      deselectChartDataPoint,
      removeSelectionFilterFromNotSelectedCharts,
      selectChartDataPoint
    }: Record<string, (...args: any[]) => any>
  ) {
    this.timeoutId = 0;
    const labelDimension = this.getSelectedDimensionOfType('X-axis categories');

    if (labelDimension) {
      const foundSelectedDataPoint = this.selectedDataPoints.find(
        (selectedDataPoint: DataPoint) =>
          selectedDataPoint.dataSeriesIndex === clickedDataPoint.dataSeriesIndex &&
          selectedDataPoint.labelIndex === clickedDataPoint.labelIndex
      );

      const selectedLabels =
        this.selectedDataPoints
          .map((selectedDataPoint: DataPoint): any => {
            if (foundSelectedDataPoint && selectedDataPoint === foundSelectedDataPoint) {
              return undefined;
            } else {
              return data.labels[selectedDataPoint.labelIndex];
            }
          })
          .filter((selectedLabel: any) => !_.isUndefined(selectedLabel)) ?? [];

      if (!foundSelectedDataPoint) {
        selectedLabels.push(data.labels[clickedDataPoint.labelIndex]);
      }

      removeSelectionFilterFromNotSelectedCharts(this);

      if (selectedLabels.length > 0) {
        addSelectionFilterToNotSelectedChartsAction(this, labelDimension, selectedLabels.toString());
      }

      if (foundSelectedDataPoint) {
        deselectChartDataPoint(this, clickedDataPoint);
      } else {
        selectChartDataPoint(this, clickedDataPoint);
      }
    }
  }

  handleDrillDown(
    clickedDataPoint: DataPoint,
    data: any,
    stateNamespace: ChartAreaStateNamespace,
    { drillDownChart }: Record<string, (...args: any[]) => any>
  ) {
    const drillDown: DrillDown = {
      selectedDimension: this.currentDrillDownSelectedDimension || this.selectedDimensions[0],
      value: data.labels[clickedDataPoint.labelIndex].startsWith('SELECTED: ')
        ? data.labels[clickedDataPoint.labelIndex].slice(10)
        : data.labels[clickedDataPoint.labelIndex]
    };

    const newDrillDownSelectedDimension = this.getNextDrillDownSelectedDimension();

    if (drillDown.selectedDimension && this.currentDrillDownSelectedDimension !== newDrillDownSelectedDimension) {
      drillDownChart(this, drillDown, newDrillDownSelectedDimension);
    }
  }
}
