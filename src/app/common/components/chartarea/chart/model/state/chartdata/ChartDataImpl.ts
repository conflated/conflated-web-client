/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import type { ColumnNameToValuesMap } from './ColumnNameToValuesMap';
import type { ChartData } from './ChartData';
import Constants from '../../../../../../Constants';
import type { SelectedFilter } from '../selectedfilters/selectedfilter/SelectedFilter';
import type { SelectedMeasure } from '../selectedmeasure/SelectedMeasure';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';
import type { MeasureVisualizationType } from '../selectedmeasure/types/MeasureVisualizationType';
import Utils from '../../../../../../utils/Utils';
import type { DimensionVisualizationType } from '../selecteddimension/types/DimensionVisualizationType';
import type { SelectedSortBy } from '../selectedsortbys/selectedsortby/SelectedSortBy';
import type { DataScopeType } from '../types/DataScopeType';
import RowComparer from './rowcomparer/RowComparer';
import { TriggersPageStateNamespace } from '../../../../../page/triggers/model/state/TriggersPageStateNamespace';

export default class ChartDataImpl implements ChartData {
  columnNameToDataMap: ColumnNameToValuesMap;

  constructor(columnNameToDataMap?: ColumnNameToValuesMap) {
    this.columnNameToDataMap = columnNameToDataMap ?? {};
  }

  filterChartData(selectedFilters: SelectedFilter[], dataScopeType: DataScopeType = 'already fetched') {
    this.setUnfilteredChartData();

    selectedFilters
      .filter((selectedFilter: SelectedFilter) => selectedFilter.dataScopeType === dataScopeType)
      .forEach((selectedFilter: SelectedFilter) => {
        this.columnNameToDataMap = selectedFilter.applyFilter(this.columnNameToDataMap);
      });
  }

  getAllValues(selectedFilter: SelectedFilter): Array<any> {
    return this.columnNameToDataMap[`${selectedFilter.sqlColumn.name}___all___`] ?? [];
  }

  getBubbleChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[], any[]] {
    const xAxisData = this.getForSelectedMeasureOfType(selectedMeasures, 'x-axis');
    const yAxisData = this.getForSelectedMeasureOfType(selectedMeasures, 'y-axis');
    const radiusData = this.getForSelectedMeasureOfType(selectedMeasures, 'radius');
    const legendData = this.getForSelectedDimensionOfType(selectedDimensions, 'Legend');

    return [xAxisData, yAxisData, radiusData, legendData];
  }

  getChartDataAsRows(): Array<{ [key: string]: any }> {
    const chartDataRowCount = this.getRowCount();
    const chartDataRows = [];

    for (let rowIndex = 0; rowIndex < chartDataRowCount; rowIndex++) {
      chartDataRows.push(
        Object.keys(this.columnNameToDataMap).reduce(
          (chartDataRow: { [key: string]: any }, columnName: string) =>
            Object.assign(chartDataRow, {
              [columnName]: this.columnNameToDataMap[columnName]?.[rowIndex] ?? undefined
            }),
          {}
        )
      );
    }

    return chartDataRows;
  }

  getChartDataRowsAsColumns(chartDataRows: Array<{ [key: string]: any }>): ColumnNameToValuesMap {
    return Object.keys(this.columnNameToDataMap).reduce(
      (chartData: object, columnName: string) =>
        Object.assign(chartData, {
          [columnName]: chartDataRows.map((chartDataRow: object) => (chartDataRow as any)[columnName])
        }),
      {}
    );
  }

  getColumnNameToValuesMap(): ColumnNameToValuesMap {
    return this.columnNameToDataMap;
  }

  getForSelectedDimension(selectedDimension: SelectedDimension | null): Array<any> {
    if (selectedDimension) {
      return this.columnNameToDataMap[selectedDimension.sqlColumn.name] ?? [];
    }

    return [];
  }

  getForSelectedDimensionOfType(
    selectedDimensions: SelectedDimension[],
    visualizationType: DimensionVisualizationType
  ): Array<any> {
    const selectedDimension = Utils.findElem(selectedDimensions, 'visualizationType', visualizationType);
    return selectedDimension ? this.getForSelectedDimension(selectedDimension) : [];
  }

  getForSelectedFilter(selectedFilter: SelectedFilter | null): Array<any> {
    if (selectedFilter) {
      if (selectedFilter.dataScopeType === 'all') {
        return this.columnNameToDataMap[`${selectedFilter.sqlColumn.name}___all___`] ?? [];
      }

      const unfilteredData = this.columnNameToDataMap[`${selectedFilter.sqlColumn.name}___unfiltered___`];
      return unfilteredData ?? this.columnNameToDataMap[selectedFilter.sqlColumn.name] ?? [];
    }

    return [];
  }

  getForSelectedMeasure(selectedMeasure: SelectedMeasure | null): Array<any> {
    if (selectedMeasure) {
      return this.columnNameToDataMap[selectedMeasure.sqlColumn.name] ?? [];
    }

    return [];
  }

  getForSelectedMeasureOfType(
    selectedMeasures: SelectedMeasure[],
    visualizationType: MeasureVisualizationType
  ): Array<any> {
    const selectedMeasure = Utils.findElem(selectedMeasures, 'visualizationType', visualizationType);
    return selectedMeasure ? this.getForSelectedMeasure(selectedMeasure) : [];
  }

  getForSelectedSortBy(selectedSortBy: SelectedSortBy | null): Array<any> {
    if (selectedSortBy) {
      return this.columnNameToDataMap[selectedSortBy.sqlColumn.name] ?? [];
    }

    return [];
  }

  getMinAndMaxValueForSelectedFilter(selectedFilter: SelectedFilter): [number, number] {
    let minValue = 0;
    let maxValue = Constants.SLIDER_MAX_VALUE;
    const columnName = selectedFilter.sqlColumn.name;

    const lowerCaseSqlColumnName = columnName.toLowerCase();
    const isPercentColumn = lowerCaseSqlColumnName.includes('percent') || lowerCaseSqlColumnName.includes('%');

    if (isPercentColumn) {
      maxValue = Constants.PERCENT_SLIDER_MAX_VALUE;
    } else {
      const measureValues =
        this.columnNameToDataMap[`${columnName}___unfiltered___`] ?? this.columnNameToDataMap[columnName];

      const measureMinValue = this.columnNameToDataMap[`${columnName}___min___`]?.[0];
      const measureMaxValue = this.columnNameToDataMap[`${columnName}___max___`]?.[0];

      if (measureValues && selectedFilter.dataScopeType === 'already fetched') {
        minValue = _.min(measureValues as number[]) ?? 0;
        maxValue = _.max(measureValues as number[]) ?? Constants.SLIDER_MAX_VALUE;
      } else if (selectedFilter.dataScopeType === 'all' && measureMinValue != null && measureMaxValue != null) {
        minValue = (measureMinValue as number) ?? 0;
        maxValue = (measureMaxValue as number) ?? Constants.SLIDER_MAX_VALUE;
      }
    }

    return [minValue, maxValue];
  }

  getMapLocationData(selectedDimensions: SelectedDimension[]): [Array<any>, Array<any>] {
    return [
      this.getForSelectedDimensionOfType(selectedDimensions, 'Latitude'),
      this.getForSelectedDimensionOfType(selectedDimensions, 'Longitude')
    ];
  }

  getRowCount(): number {
    const columnNames = Object.keys(this.columnNameToDataMap).filter(
      (columnName: string) => !columnName.endsWith('___')
    );

    if (columnNames.length > 0) {
      return columnNames.reduce(
        (accumulatedRowCount: number, columnName: string) =>
          Math.min(accumulatedRowCount, this.columnNameToDataMap[columnName]?.length ?? 0),
        Number.MAX_SAFE_INTEGER
      );
    }

    return 0;
  }

  getScatterChartData(
    selectedMeasures: SelectedMeasure[],
    selectedDimensions: SelectedDimension[]
  ): [any[], any[], any[]] {
    const xAxisData = this.getForSelectedMeasureOfType(selectedMeasures, 'x-axis');
    const yAxisData = this.getForSelectedMeasureOfType(selectedMeasures, 'y-axis');
    const legendData = this.getForSelectedDimensionOfType(selectedDimensions, 'Legend');

    return [xAxisData, yAxisData, legendData];
  }

  getTriggerData(pageStateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>, Array<any>] {
    const triggerNameData = this.columnNameToDataMap['"Description"'] ?? [];
    return [triggerNameData, ...this.getTriggerGroupData(pageStateNamespace)];
  }

  getTriggerGroupData(pageStateNamespace: TriggersPageStateNamespace): [Array<any>, Array<any>] {
    const triggerGroupNameData = this.columnNameToDataMap['"Labels"'] ?? [];
    const severityOrStatusData =
      (pageStateNamespace === 'alertsPage' ? this.columnNameToDataMap.Severity : this.columnNameToDataMap.Status) ?? [];

    return [triggerGroupNameData, severityOrStatusData];
  }

  setUnfilteredChartData() {
    Object.keys(this.columnNameToDataMap)
      .filter((columnName: string) => !columnName.endsWith('___'))
      .forEach((columnName: string) => {
        if (!this.columnNameToDataMap[`${columnName}___unfiltered___`]) {
          this.columnNameToDataMap[`${columnName}___unfiltered___`] = this.columnNameToDataMap[columnName];
        }

        this.columnNameToDataMap[columnName] = this.columnNameToDataMap[`${columnName}___unfiltered___`];
      });
  }

  sort(selectedSortBys: SelectedSortBy[], chartDataRows: Array<{ [key: string]: any }>, dataScopeType: DataScopeType) {
    Utils.pick(selectedSortBys, 'dataScopeType', dataScopeType).forEach(
      ({ sqlColumn, sortDirection }: SelectedSortBy) => {
        if (chartDataRows.length > 0 && chartDataRows[0][sqlColumn.name]) {
          chartDataRows.sort((chartDataRow1: { [key: string]: any }, chartDataRow2: { [key: string]: any }) =>
            RowComparer.compareRows(chartDataRow1, chartDataRow2, sortDirection, sqlColumn.name)
          );
        }
      }
    );
  }

  sortChartData(selectedSortBys: SelectedSortBy[], dataScopeType: DataScopeType = 'already fetched') {
    if (_.isEmpty(selectedSortBys) || !Utils.has(selectedSortBys, 'dataScopeType', dataScopeType)) {
      return;
    }

    const chartDataRows = this.getChartDataAsRows();
    this.sort(selectedSortBys, chartDataRows, dataScopeType);
    this.columnNameToDataMap = this.getChartDataRowsAsColumns(chartDataRows);
  }
}
