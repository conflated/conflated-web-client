import _ from 'lodash';
import type { ChartFilters } from './ChartFilters';
import type { DataScopeType } from '../types/DataScopeType';
import type { Filter } from './filter/Filter';
import type { AggregationFunction } from '../selectedmeasure/types/AggregationFunction';
import Utils from '../../../../../../utils/Utils';
import SqlUtils from '../../../../../../utils/SqlUtils';
import type { ChartData } from '../data/ChartData';
import type { FilterInputType } from './filter/inputtype/FilterInputType';
import FilterFactory from './filter/FilterFactory';
import type { Dimension } from '../../../../../../../page/dataexplorer/pane/left/selector/dimension/model/state/types/Dimension';
import type { Measure } from '../../../../../../../page/dataexplorer/pane/left/selector/measure/model/state/types/Measure';
import type { DrillDown } from '../types/DrillDown';
import type { SelectedDimension } from '../selecteddimension/SelectedDimension';

export default class ChartFiltersImpl implements ChartFilters {
  selectedFilters: Filter[];

  chartData: ChartData;

  constructor(selectedFilters: Filter[], chartData: ChartData) {
    this.selectedFilters = selectedFilters;
    this.chartData = chartData;
  }

  addDimensionSelectedFilter(dimension: Dimension): Filter {
    const selectedFilter = FilterFactory.createDimensionSelectedFilter(dimension);
    this.selectedFilters = [...this.selectedFilters, selectedFilter];
    return selectedFilter;
  }

  addDrillDownFilter(drillDown: DrillDown) {
    const drillDownFilter = FilterFactory.createDrillDownFilter(drillDown, drillDown.value);
    this.selectedFilters = [...this.selectedFilters, drillDownFilter];
  }

  addMeasureSelectedFilter(measure: Measure): Filter {
    const selectedFilter = FilterFactory.createMeasureSelectedFilter(measure);
    this.selectedFilters = [...this.selectedFilters, selectedFilter];
    return selectedFilter;
  }

  addSelectionFilter(chartId: string, selectedDimension: SelectedDimension, filterExpression: string) {
    const selectedFilter = FilterFactory.createSelectionFilter(chartId, selectedDimension, filterExpression);

    this.selectedFilters = [...this.selectedFilters, selectedFilter];
  }

  changeSelectedFilterAggregationFunction(selectedFilter: Filter, aggregationFunction: AggregationFunction) {
    this.selectedFilters = Utils.merge(this.selectedFilters, selectedFilter, {
      aggregationFunction,
      sqlColumn: {
        name: SqlUtils.getSqlColumnName(selectedFilter.measureOrDimension, aggregationFunction),
        expression: SqlUtils.getSqlColumnExpression(selectedFilter.measureOrDimension, aggregationFunction)
      }
    });

    this.chartData.filterChartData(this.selectedFilters, selectedFilter.dataScopeType);
  }

  changeSelectedFilterDataScopeType(selectedFilter: Filter, dataScopeType: DataScopeType) {
    this.selectedFilters = Utils.merge(this.selectedFilters, selectedFilter, {
      dataScopeType
    });
  }

  changeSelectedFilterExpression(selectedFilterToChange: Filter, filterExpression: string) {
    this.selectedFilters = this.selectedFilters.map((selectedFilter) =>
      selectedFilter === selectedFilterToChange
        ? FilterFactory.createSelectedFilter({ ...selectedFilterToChange.getConfiguration(), filterExpression })
        : selectedFilter
    );
  }

  changeSelectedFilterInputType(selectedFilter: Filter, filterInputType: FilterInputType): Filter {
    const filterExpression = filterInputType === 'Relative time filter' ? ' Minutes' : '';

    const newSelectedFilterConfiguration = {
      ...selectedFilter.getConfiguration(),
      filterExpression,
      filterInputType
    };

    const newSelectedFilter = FilterFactory.createSelectedFilter(newSelectedFilterConfiguration);
    this.selectedFilters = Utils.replace(this.selectedFilters, selectedFilter, newSelectedFilter);
    return newSelectedFilter;
  }

  getSelectedFilters(): Filter[] {
    return this.selectedFilters;
  }

  getLastDrillDownFilter(): Filter | null | undefined {
    return Utils.findLastElem(this.selectedFilters, 'isDrillDownFilter');
  }

  removeSelectedFilter(selectedFilter: Filter) {
    this.selectedFilters = _.without(this.selectedFilters, selectedFilter);
    this.chartData.filterChartData(this.selectedFilters);
  }

  removeSelectionFilter(selectionChartId: string) {
    this.selectedFilters = this.selectedFilters.filter(
      ({ chartId, isSelectionFilter }: Filter) => !isSelectionFilter || chartId !== selectionChartId
    );

    this.chartData.filterChartData(this.selectedFilters);
  }
}
