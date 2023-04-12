import { Inject } from 'noicejs';
import type { ChartAreaState } from '../../../../state/ChartAreaState';
import { ChartDataService } from '../../../../../chart/model/service/ChartDataService';
import type { ColumnNameToValuesMap } from '../../../../../chart/model/state/data/ColumnNameToValuesMap';
import type { ChartAreaStateNamespace } from '../../../../state/types/ChartAreaStateNamespace';
import type { Filter } from '../../../../../chart/model/state/filters/filter/Filter';
import FinishFetchPartialDataForSelectedChartAction from './FinishFetchPartialDataForSelectedChartAction';
import ChartAreaStateUpdater from '../../../../state/utils/ChartAreaStateUpdater';
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
    const selectedFilters = selectedChart.getSelectedFilters();

    const minMaxMeasureColumns = selectedFilters
      .filter(({ type, filterInputType }: Filter) => type === 'measure' && filterInputType === 'Range filter')
      .map(({ dataScopeType, sqlColumn: { name, expression } }: Filter) => ({
        name,
        expression,
        fetchedRowCount: dataScopeType === 'already fetched' ? selectedChart.fetchedRowCount : 0
      }));

    this.chartDataService
      .fetchMinAndMaxValues(selectedChart.dataSource, minMaxMeasureColumns, [], selectedFilters)
      .then((columnNameToValuesMap: ColumnNameToValuesMap) =>
        this.dispatch(new FinishFetchPartialDataForSelectedChartAction(this.stateNamespace, columnNameToValuesMap))
      );

    selectedChart.isFetchingChartData = true;
    return ChartAreaStateUpdater.getNewStateForChangedChart(currentState, selectedChart);
  }
}

export default StartFetchMeasureFilterMinAndMaxValuesForSelectedChartAction;
