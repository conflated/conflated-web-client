/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import type { Measure } from '../../../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { Dimension } from '../../../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { AggregationFunction } from '../../../selectedmeasure/types/AggregationFunction';
import type { FilterType } from '../types/FilterType';
import type { FilterInputType } from '../types/FilterInputType';
import type { DataScopeType } from '../../../types/DataScopeType';
import type { SelectedFilter } from '../SelectedFilter';
import type { SelectedFilterConfiguration } from '../SelectedFilterConfiguration';
import type { ColumnNameToValuesMap } from '../../../chartdata/ColumnNameToValuesMap';
import type { ChartData } from '../../../chartdata/ChartData';

export default abstract class AbstractSelectedFilterImpl implements SelectedFilter {
  readonly measureOrDimension: Measure | Dimension;

  readonly sqlColumn: {
    readonly name: string;
    readonly expression: string;
  };

  readonly aggregationFunction: AggregationFunction;

  readonly type: FilterType;

  readonly filterExpression: string;

  readonly filterInputType: FilterInputType;

  readonly dataScopeType: DataScopeType;

  readonly allowedDimensionFilterInputTypes: FilterInputType[];

  readonly chartId: string;

  readonly isSelectionFilter: boolean;

  readonly isDrillDownFilter: boolean;

  constructor(selectedFilterConfiguration: SelectedFilterConfiguration) {
    this.measureOrDimension = selectedFilterConfiguration.measureOrDimension;
    this.sqlColumn = selectedFilterConfiguration.sqlColumn;
    this.aggregationFunction = selectedFilterConfiguration.aggregationFunction;
    this.type = selectedFilterConfiguration.type;
    this.filterExpression = selectedFilterConfiguration.filterExpression;
    this.filterInputType = selectedFilterConfiguration.filterInputType;
    this.dataScopeType = selectedFilterConfiguration.dataScopeType;
    this.allowedDimensionFilterInputTypes = selectedFilterConfiguration.allowedDimensionFilterInputTypes;
    this.chartId = selectedFilterConfiguration.chartId;
    this.isSelectionFilter = selectedFilterConfiguration.isSelectionFilter;
    this.isDrillDownFilter = selectedFilterConfiguration.isDrillDownFilter;
  }

  getConfiguration(): SelectedFilterConfiguration {
    return {
      measureOrDimension: this.measureOrDimension,
      sqlColumn: this.sqlColumn,
      aggregationFunction: this.aggregationFunction,
      type: this.type,
      filterExpression: this.filterExpression,
      filterInputType: this.filterInputType,
      dataScopeType: this.dataScopeType,
      allowedDimensionFilterInputTypes: this.allowedDimensionFilterInputTypes,
      chartId: this.chartId,
      isSelectionFilter: this.isSelectionFilter,
      isDrillDownFilter: this.isDrillDownFilter
    };
  }

  abstract applyFilter(chartData: ColumnNameToValuesMap): ColumnNameToValuesMap;

  abstract getFilterInputView(
    className: string,
    chartData: ChartData,
    changeFilterExpression: (filterExpression: string) => void
  ): JSX.Element;

  filterChartDataOtherColumns(chartData: ColumnNameToValuesMap, filteredInIndexes: number[]): ColumnNameToValuesMap {
    const newChartData = chartData;

    if (!_.isEmpty(filteredInIndexes)) {
      Object.keys(chartData)
        .filter((column: string) => !column.endsWith('___') && column !== this.sqlColumn.name)
        .forEach((column: string) => {
          if (chartData[column]) {
            newChartData[column] = (chartData as any)[column].filter((unused: any, index: number) =>
              filteredInIndexes.includes(index)
            );
          }
        });
    }

    return newChartData;
  }

  shouldFetchChartData(chartData: ChartData): boolean {
    const filterValues = chartData.getForSelectedFilter(this);

    return (
      (this.type === 'measure' &&
        this.filterInputType === 'Range filter' &&
        this.dataScopeType === 'already fetched' &&
        !filterValues) ||
      (this.type === 'dimension' &&
        this.dataScopeType === 'already fetched' &&
        !filterValues &&
        (this.filterInputType === 'Dropdown filter' ||
          this.filterInputType === 'Checkboxes filter' ||
          this.filterInputType === 'Radio buttons filter'))
    );
  }

  shouldFetchDimensionValues(chartData: ChartData): boolean {
    const allFilterValues = chartData.getAllValues(this);

    return (
      this.type === 'dimension' &&
      this.dataScopeType === 'all' &&
      !allFilterValues &&
      (this.filterInputType === 'Dropdown filter' ||
        this.filterInputType === 'Checkboxes filter' ||
        this.filterInputType === 'Radio buttons filter')
    );
  }

  shouldFetchMeasureMinMaxValues(chartData: ChartData): boolean {
    const [minValue, maxValue] = chartData.getMinAndMaxValueForSelectedFilter(this);

    return (
      this.type === 'measure' &&
      this.filterInputType === 'Range filter' &&
      this.dataScopeType === 'all' &&
      minValue == null &&
      maxValue == null
    );
  }
}
