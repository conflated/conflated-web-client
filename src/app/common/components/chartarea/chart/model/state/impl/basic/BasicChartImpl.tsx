/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import type { ChartAreaPageStateNamespace } from '../../../../../model/state/namespace/ChartAreaPageStateNamespace';
import ApexChartView from '../../../../view/basic/apex/ApexChartView';
import type { DataSeries } from '../../types/DataSeries';
import type { SelectedMeasure } from '../../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../../selecteddimension/SelectedDimension';
import type { LegendPosition } from '../../types/LegendPosition';
import type { DataPoint } from '../../types/DataPoint';
import type { DrillDown } from '../../types/DrillDown';
import DrillDownChartImpl from '../DrillDownChartImpl';
import type { MeasureVisualizationType } from '../../selectedmeasure/types/MeasureVisualizationType';

export default abstract class BasicChartImpl extends DrillDownChartImpl {
  isInternallyTriggeredDataPointSelection = false;

  dataPointSelectionTimeoutId: ReturnType<typeof setTimeout> | 0 = 0;

  lastSelectedDataPoint: DataPoint = {
    dataSeriesIndex: -1,
    labelIndex: 1
  };

  createChartView(width: number, height: number, pageStateNamespace: ChartAreaPageStateNamespace): JSX.Element {
    return <ApexChartView chart={this} width={width} height={height} pageStateNamespace={pageStateNamespace} />;
  }

  exportToPdf = () => {
    // eslint-disable-next-line no-undef,no-underscore-dangle
    const foundChartInstance: any = (window as any).Apex._chartInstances.find(
      (chartInstance: any) => chartInstance.id === this.id
    );

    if (foundChartInstance) {
      foundChartInstance.chart.dataURI().then((uri: string) => {
        // eslint-disable-next-line new-cap
        const pdf = new jsPDF({ orientation: 'landscape' });
        pdf.addImage(uri, 'PNG', 0, 0, 200, 200);
        const title = this.getTitleText() || '';
        pdf.save(`${title} ${this.getSubtitleText()}.pdf`);
      });
    }
  };

  exportToPng = () => {
    // eslint-disable-next-line no-undef,no-underscore-dangle
    const foundChartInstance: any = (window as any).Apex._chartInstances.find(
      (chartInstance: any) => chartInstance.id === this.id
    );

    if (foundChartInstance) {
      foundChartInstance.chart.dataURI().then((uri: string) => {
        const title = this.getTitleText() || '';
        FileSaver.saveAs(uri, `${title} ${this.getSubtitleText()}.png`);
      });
    }
  };

  exportToSvg = () => {
    // eslint-disable-next-line no-undef,no-underscore-dangle
    const foundChartInstance: any = (window as any).Apex._chartInstances.find(
      (chartInstance: any) => chartInstance.id === this.id
    );

    if (foundChartInstance) {
      const svgString = foundChartInstance.chart.paper().svg();
      const title = this.getTitleText() || '';
      FileSaver.saveAs(new Blob([svgString]), `${title} ${this.getSubtitleText()}.svg`);
    }
  };

  getApexChartDataSeries(shownXAxisCategories: Array<any>): DataSeries[] | any[] {
    if (this.selectedMeasures.length > 0 && !this.hasSelectedDimensionOfType('Legend')) {
      return this.getApexChartNonLegendDataSeries();
    } else if (this.selectedMeasures.length >= 1 && this.hasSelectedDimensionOfType('Legend')) {
      return this.getApexChartLegendDataSeries(shownXAxisCategories);
    }

    return this.getEmptyDataSeries();
  }

  getApexChartNonLegendDataSeries(): DataSeries[] {
    const dataSeries: DataSeries[] = [];
    const xAxisValues = this.getChartDataForSelectedDimensionOfType('X-axis categories');

    this.selectedMeasures.forEach((selectedMeasure: SelectedMeasure) => {
      let measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);
      if (measureValues.length === 0) {
        dataSeries.push({
          name: '',
          type: 'column',
          data: [0]
        });

        return;
      }

      if (this.hasContinuousXAxis() && this.hasTimestampXAxis()) {
        measureValues = xAxisValues.map((xValue: string, valueIndex: number) => ({
          x: xValue,
          y: measureValues[valueIndex]
        }));
      } else if (measureValues.length === 1 && !this.supportsAllDimension()) {
        measureValues = [0];
      }

      measureValues = this.sliceOrFillXAxisData(measureValues);

      dataSeries.push({
        name: selectedMeasure.measure.name,
        type: this.getDataSeriesType(selectedMeasure.visualizationType),
        data: measureValues.length > 0 ? measureValues : [0]
      });
    });

    return dataSeries;
  }

  getApexChartLegendDataSeries(shownXAxisCategories: Array<any>): DataSeries[] {
    const dataSeries: DataSeries[] = [];
    const xAxisValues = this.getChartDataForSelectedDimensionOfType('X-axis categories');
    const measureValues = this.chartData.getForSelectedMeasure(this.selectedMeasures[0]);
    const legendValues = this.getChartDataForSelectedDimensionOfType('Legend');

    if (legendValues.length > 0) {
      legendValues.forEach((legendValue: any, valueIndex: number) => {
        if (shownXAxisCategories.includes(xAxisValues[valueIndex])) {
          const foundDataSeries = dataSeries.find(({ name }: DataSeries) => name === legendValue);
          if (foundDataSeries == null) {
            dataSeries.push({
              name: legendValue,
              data: [measureValues[valueIndex]],
              type: this.getLegendDataSeriesType(this.selectedMeasures[0].visualizationType)
            });
          } else {
            foundDataSeries.data.push(measureValues[valueIndex]);
          }
        }
      });

      dataSeries.forEach(({ data }: DataSeries) => {
        if (data.length < this.xAxisCategoriesShownCount) {
          // eslint-disable-next-line no-param-reassign
          data.length = this.xAxisCategoriesShownCount;
          measureValues.fill(0, data.length, this.xAxisCategoriesShownCount);
        }
      });

      return dataSeries;
    }

    return this.getEmptyDataSeries();
  }

  // noinspection JSMethodCanBeStatic
  getEmptyDataSeries(): DataSeries[] {
    return [
      {
        name: '',
        type: 'column',
        data: [0]
      }
    ];
  }

  getLegendDataSeriesType(visualizationType: MeasureVisualizationType): string | undefined {
    return visualizationType === 'none' ? undefined : visualizationType;
  }

  getDataSeriesType(visualizationType: MeasureVisualizationType): string | undefined {
    let dataSeriesType;

    if (this.selectedMeasures.length > 1) {
      if (this.selectedDimensions.length === 0) {
        dataSeriesType = 'column';
      } else if (visualizationType !== 'none') {
        dataSeriesType = visualizationType;
      }
    }

    return dataSeriesType;
  }

  getTooltipXValueFormatter(): ((value: any, params: object) => string) | null | undefined {
    if (this.hasSelectedMeasureOfType('tooltip')) {
      return (value: any, { dataPointIndex }: any): string =>
        this.selectedMeasures.reduce(
          (tooltipYValue: string, selectedMeasure: SelectedMeasure, selectedMeasureIndex: number): string => {
            const measureValues = this.chartData.getForSelectedMeasure(selectedMeasure);

            if (measureValues.length > 0) {
              if (selectedMeasureIndex === 0) {
                return `${selectedMeasure.measure.name}: ${measureValues[dataPointIndex]}`;
              }

              return `${tooltipYValue}, ${selectedMeasure.measure.name}: ${measureValues[dataPointIndex]}`;
            }

            return '';
          },
          ''
        );
    }

    return null;
  }

  getTooltipYValueFormatter(): ((value: any, params: object) => string) | null | undefined {
    if (this.hasSelectedDimensionOfType('Tooltip')) {
      return (value: any, { dataPointIndex }: any): string =>
        this.selectedDimensions.reduce(
          (tooltipXValue: string, selectedDimension: SelectedDimension, selectedDimensionIndex: number): string => {
            const dimensionValues = this.chartData.getForSelectedDimension(selectedDimension);

            if (dimensionValues.length > 0) {
              if (selectedDimensionIndex === 0) {
                return `${selectedDimension.dimension.name}: ${dimensionValues[dataPointIndex]}`;
              }

              return `${tooltipXValue}, ${selectedDimension.dimension.name}: ${dimensionValues[dataPointIndex]}`;
            }

            return '';
          },
          ''
        );
    }

    return null;
  }

  handleDataPointSelection(
    event: object,
    chartContext: object,
    params: object,
    stateNamespace: ChartAreaPageStateNamespace,
    actions: Record<string, (...args: any[]) => any>
  ) {
    const { dataPointIndex, seriesIndex: dataSeriesIndex } = params as any;
    if (this.isInternallyTriggeredDataPointSelection) {
      this.handleSelectDataPoint(params, actions);
    } else if (
      this.dataPointSelectionTimeoutId &&
      dataSeriesIndex === this.lastSelectedDataPoint.dataSeriesIndex &&
      dataPointIndex === this.lastSelectedDataPoint.labelIndex
    ) {
      this.handleDrilldown(params, actions);

      if (this.dataPointSelectionTimeoutId) {
        clearTimeout(this.dataPointSelectionTimeoutId);
        this.dataPointSelectionTimeoutId = 0;
      }
    } else {
      this.lastSelectedDataPoint = {
        dataSeriesIndex,
        labelIndex: dataPointIndex
      };

      this.dataPointSelectionTimeoutId = setTimeout(() => this.handleSelectDataPoint(params, actions), 450);
    }
  }

  handleSelectDataPoint(
    { selectedDataPoints, w }: any,
    {
      addSelectionFilterToNotSelectedChartsAction,
      removeSelectionFilterFromNotSelectedCharts
    }: Record<string, (...args: any[]) => void>
  ) {
    this.dataPointSelectionTimeoutId = 0;
    const xAxisCategoriesSelectedDimension = this.getSelectedDimensionOfType('X-axis categories');
    const dataPointsSelectedDimension = this.getSelectedDimensionOfType('Data points');
    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');

    const labelSelectionDimension =
      this.currentDrillDownSelectedDimension ||
      xAxisCategoriesSelectedDimension ||
      dataPointsSelectedDimension ||
      legendSelectedDimension;

    if (labelSelectionDimension) {
      removeSelectionFilterFromNotSelectedCharts(this);
      const selectedLabels: any[] = [];
      const selectedLegends: any[] = [];

      selectedDataPoints.forEach((seriesSelectedDataPoints: number[], seriesIndex: number) => {
        if (xAxisCategoriesSelectedDimension && legendSelectedDimension && seriesSelectedDataPoints.length > 0) {
          selectedLegends.push(w.globals.seriesNames[seriesIndex]);
        }

        seriesSelectedDataPoints.forEach((index: number) => {
          if (dataPointsSelectedDimension) {
            selectedLabels.push(this.chartData.getForSelectedDimension(labelSelectionDimension)[index]);
          } else {
            selectedLabels.push(w.globals.labels[index]);
          }
        });
      });

      if (selectedLabels.length > 0) {
        addSelectionFilterToNotSelectedChartsAction(this, labelSelectionDimension, _.uniq(selectedLabels).toString());
      }

      if (this.hasNonTimestampLegend() && legendSelectedDimension && selectedLegends.length > 0) {
        addSelectionFilterToNotSelectedChartsAction(this, legendSelectedDimension, selectedLegends.toString());
      }
    }
  }

  handleDrilldown({ dataPointIndex, w }: any, { drillDownChart }: Record<string, (...args: any[]) => any>) {
    const drillDown: DrillDown = {
      selectedDimension: this.currentDrillDownSelectedDimension ?? this.selectedDimensions[0],
      value: w.globals.labels[dataPointIndex]
    };

    const newDrillDownSelectedDimension = this.getNextDrillDownSelectedDimension();

    if (drillDown.selectedDimension && this.currentDrillDownSelectedDimension !== newDrillDownSelectedDimension) {
      drillDownChart(this, drillDown, newDrillDownSelectedDimension);
    }
  }

  hasNonTimestampLegend(): boolean {
    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');

    return (
      legendSelectedDimension != null &&
      !legendSelectedDimension.dimension.isTimestamp &&
      !legendSelectedDimension.dimension.isDate
    );
  }

  hasTimestampLegend(): boolean {
    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');

    return (
      legendSelectedDimension != null &&
      (legendSelectedDimension.dimension.isTimestamp || legendSelectedDimension.dimension.isDate)
    );
  }

  removeSelectedDimension(selectedDimension: SelectedDimension) {
    this.selectedSortBys.updateSelectedSortBysWhenRemovingSelectedDimension(selectedDimension, this.selectedMeasures);

    super.removeSelectedDimension(selectedDimension);
  }

  removeSelectedMeasure(selectedMeasure: SelectedMeasure) {
    this.selectedSortBys.updateSelectedSortBysWhenRemovingSelectedMeasure(selectedMeasure, this.selectedMeasures);

    super.removeSelectedMeasure(selectedMeasure);
  }

  shouldShowDataLabels(): boolean {
    const legendSelectedDimension = this.getSelectedDimensionOfType('Legend');
    const uniqueLegendDataValues = _.uniq(this.chartData.getForSelectedDimension(legendSelectedDimension));

    return (
      this.selectedMeasures.length > 0 &&
      this.selectedMeasures.length < 6 &&
      this.chartData.getForSelectedMeasure(this.selectedMeasures[0]).length > 0 &&
      (this.selectedDimensions.length > 0 || (this.selectedDimensions.length === 0 && this.supportsAllDimension())) &&
      uniqueLegendDataValues.length < 6
    );
  }

  shouldShowLegend(): [boolean, LegendPosition] {
    const shouldShowLegend = this.hasTimestampLegend() ? false : this.hasSelectedDimensionOfType('Legend');
    return [shouldShowLegend, 'bottom'];
  }

  sliceOrFillXAxisData(data: Array<any>): Array<any> {
    if (this.isXAxisScrollable()) {
      const slicedData = data.slice(
        this.xAxisScrollPosition || 0,
        Math.min((this.xAxisScrollPosition ?? 0) + this.xAxisCategoriesShownCount, data.length)
      );

      if (slicedData.length < this.xAxisCategoriesShownCount) {
        slicedData.length = this.xAxisCategoriesShownCount;
        slicedData.fill(0, slicedData.length, this.xAxisCategoriesShownCount);
      }

      return slicedData;
    }

    return data;
  }
}
