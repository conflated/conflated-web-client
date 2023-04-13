import type { ChartFilters } from './ChartFilters';
import type { DataScopeType } from '../types/DataScopeType';
import type { Filter } from './filter/Filter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import Utils, { isNot } from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { ChartData } from '../data/ChartData';
import type { FilterInputType } from './filter/inputtype/FilterInputType';
import FilterFactory from './filter/FilterFactory';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export default class ChartFiltersImpl implements ChartFilters {
  filters: Filter[];

  chartData: ChartData;

  constructor(filters: Filter[], chartData: ChartData) {
    this.filters = filters;
    this.chartData = chartData;
  }

  addDimensionFilter(dimension: Dimension): Filter {
    const selectedFilter = FilterFactory.createDimensionSelectedFilter(dimension);
    this.filters = [...this.filters, selectedFilter];
    return selectedFilter;
  }

  addDrillDownFilter(drillDown: DrillDown) {
    const drillDownFilter = FilterFactory.createDrillDownFilter(drillDown, drillDown.value);
    this.filters = [...this.filters, drillDownFilter];
  }

  addMeasureFilter(measure: Measure): Filter {
    const selectedFilter = FilterFactory.createMeasureSelectedFilter(measure);
    this.filters = [...this.filters, selectedFilter];
    return selectedFilter;
  }

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string) {
    const selectedFilter = FilterFactory.createSelectionFilter(chartId, selectedDimension, filterExpression);

    this.filters = [...this.filters, selectedFilter];
  }

  changeFilterAggregationFunction(selectedFilter: Filter, aggregationFunction: AggregationFunction) {
    this.filters = Utils.merge(this.filters, selectedFilter, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedFilter.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedFilter.measureOrDimension, aggregationFunction)
      }
    });

    this.chartData.filterChartData(this.filters, selectedFilter.dataScopeType);
  }

  changeFilterDataScopeType(selectedFilter: Filter, dataScopeType: DataScopeType) {
    const newSelectedFilterConfiguration = {
      ...selectedFilter.getConfiguration(),
      dataScopeType
    };

    const newSelectedFilter = FilterFactory.createSelectedFilter(newSelectedFilterConfiguration);
    this.filters = Utils.replace(this.filters, selectedFilter, newSelectedFilter);
  }

  changeFilterExpression(selectedFilter: Filter, filterExpression: string) {
    const newSelectedFilterConfiguration = {
      ...selectedFilter.getConfiguration(),
      filterExpression
    };

    const newSelectedFilter = FilterFactory.createSelectedFilter(newSelectedFilterConfiguration);
    this.filters = Utils.replace(this.filters, selectedFilter, newSelectedFilter);
  }

  changeFilterInputType(selectedFilter: Filter, filterInputType: FilterInputType): Filter {
    const filterExpression = filterInputType === 'Relative time filter' ? ' Minutes' : '';

    const newSelectedFilterConfiguration = {
      ...selectedFilter.getConfiguration(),
      filterExpression,
      filterInputType
    };

    const newSelectedFilter = FilterFactory.createSelectedFilter(newSelectedFilterConfiguration);
    this.filters = Utils.replace(this.filters, selectedFilter, newSelectedFilter);
    return newSelectedFilter;
  }

  getFilters(): Filter[] {
    return this.filters;
  }

  getLastDrillDownFilter(): Filter | null | undefined {
    return Utils.findLastElem(this.filters, 'isDrillDownFilter');
  }

  removeFilter(selectedFilter: Filter) {
    this.filters = this.filters.filter(isNot(selectedFilter));
    this.chartData.filterChartData(this.filters);
  }

  removeSelectionFilter(selectionChartId: string) {
    this.filters = this.filters.filter(
      ({ chartId, isSelectionFilter }: Filter) => !isSelectionFilter || chartId !== selectionChartId
    );

    this.chartData.filterChartData(this.filters);
  }
}
