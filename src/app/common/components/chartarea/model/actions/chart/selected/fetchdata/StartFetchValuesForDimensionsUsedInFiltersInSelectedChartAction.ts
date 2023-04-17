import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import FinishFetchPartialDataForSelectedChartAction from './FinishFetchPartialDataForSelectedChartAction';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import { Column } from '../../../../../chart/model/state/types/Column';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('chartDataService')
class StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;

    const dimensionColumns: Column[] = selectedChart
      .getFilters()
      .filter(
        ({ type, filterInputType }: Filter) =>
          (type === 'dimension' && filterInputType === 'Dropdown filter') ||
          filterInputType === 'Checkboxes filter' ||
          filterInputType === 'Radio buttons filter'
      )
      .map(({ sqlColumn: { name, expression } }: Filter) => ({
        name,
        expression,
        type: 'dimension'
      }));

    this.chartDataService
      .fetchDimensionValues(selectedChart.dataSource, dimensionColumns)
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatch(new FinishFetchPartialDataForSelectedChartAction(this.stateNamespace, columnNameToValuesMap))
      );

    selectedChart.isFetchingData = true;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchValuesForDimensionsUsedInFiltersInSelectedChartAction;
