import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import FinishFetchPartialDataForSelectedChartAction from '../../fetchdata/FinishFetchPartialDataForSelectedChartAction';
import ChartAreaStateFactory from '../../../../state/ChartAreaStateFactory';
import AbstractChartAreaAction from '../../../AbstractChartAreaAction';

type ConstructorArgs = {
  chartDataService: ChartDataService;
  stateNamespace: ChartAreaStateNamespace;
};

@Inject('chartDataService')
class StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction extends AbstractChartAreaAction {
  private readonly chartDataService: ChartDataService;

  constructor({ chartDataService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.chartDataService = chartDataService;
  }

  perform(currentState: ChartAreaState): ChartAreaState {
    const { selectedChart } = currentState;
    const selectedFilters = selectedChart.getFilters();

    const minMaxMeasureColumns = selectedFilters
      .filter(({ type, filterInputType }: Filter) => type === 'measure' && filterInputType === 'Range filter')
      .map(({ dataScope, sqlColumn: { name, expression } }: Filter) => ({
        name,
        expression,
        fetchedRowCount: dataScope === 'already fetched' ? selectedChart.fetchedRowCount : 0
      }));

    this.chartDataService
      .fetchMinAndMaxValues(selectedChart.dataSource, minMaxMeasureColumns, [], selectedFilters)
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatch(new FinishFetchPartialDataForSelectedChartAction(this.stateNamespace, columnNameToValuesMap))
      );

    selectedChart.isFetchingData = true;
    return ChartAreaStateFactory.createNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction;
